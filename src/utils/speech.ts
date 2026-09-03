/**
 * Speech synthesis utility for natural, clear English pronunciation
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

let preferredVoice: SpeechSynthesisVoice | null = null;

function loadVoices(): void {
  if (!synth) return;
  const voices = synth.getVoices();
  if (voices.length === 0) return;

  // Prioritize high-quality natural English voices
  const prioritizedNames = [
    'Google US English',
    'Google UK English Female',
    'Google UK English Male',
    'Samantha',
    'Daniel',
    'Victoria',
    'Karen',
    'Moira',
    'Microsoft Zira',
    'Microsoft Jenny Online',
    'Microsoft Mark',
  ];

  for (const name of prioritizedNames) {
    const found = voices.find((v) => v.name.includes(name));
    if (found) {
      preferredVoice = found;
      return;
    }
  }

  // Fallback: any en-US or en-GB
  const enVoice = voices.find((v) => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB') || v.lang.startsWith('en'));
  if (enVoice) {
    preferredVoice = enVoice;
  }
}

if (typeof window !== 'undefined' && synth) {
  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}

export function playAudioWord(
  text: string,
  options?: {
    rate?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  }
): void {
  if (!synth) {
    options?.onError?.();
    return;
  }

  try {
    synth.cancel(); // Stop any pending utterance
    loadVoices();

    const utterance = new SpeechSynthesisUtterance(text);
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    utterance.lang = preferredVoice?.lang || 'en-US';
    utterance.rate = options?.rate ?? 0.88; // Slightly measured for grade 7 learners
    utterance.pitch = 1.02;

    utterance.onstart = () => {
      options?.onStart?.();
    };

    utterance.onend = () => {
      options?.onEnd?.();
    };

    utterance.onerror = () => {
      options?.onEnd?.();
      options?.onError?.();
    };

    synth.speak(utterance);
  } catch (err) {
    console.warn('SpeechSynthesis error:', err);
    options?.onError?.();
  }
}

export function stopAudio(): void {
  if (synth) {
    synth.cancel();
  }
}
