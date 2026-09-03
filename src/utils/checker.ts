import { ExerciseItem } from '../types';

export function normalizeText(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isAnswerCorrect(item: ExerciseItem, userAnswer: string | undefined): boolean {
  if (!userAnswer || !userAnswer.trim()) return false;

  const trimmed = userAnswer.trim();

  // MCQ
  if (item.type === 'mcq') {
    // userAnswer might be 'A' or 'A. building'
    const letter = trimmed.charAt(0).toUpperCase();
    return letter === item.correctAnswer.toUpperCase();
  }

  // Dạng 2: Chia động từ & Điền từ
  if (item.type === 'fill_blank_verb' || item.type === 'fill_blank_word') {
    const normUser = normalizeText(trimmed);
    const normCorrect = normalizeText(item.correctAnswer);

    if (normUser === normCorrect) return true;

    // Check accepted alternatives
    if (item.acceptedAnswers) {
      for (const alt of item.acceptedAnswers) {
        if (normUser === normalizeText(alt)) return true;
      }
    }

    // Special case for "Do ... go" / "does ... take"
    if (item.id === 23) {
      const parts = normUser.split(' ');
      if (parts.includes('do') && parts.includes('go')) return true;
    }
    if (item.id === 27) {
      const parts = normUser.split(' ');
      if (parts.includes('does') && parts.includes('take')) return true;
    }
    if (item.id === 22) {
      if (normUser === "doesn t like" || normUser === "doesnt like" || normUser === "does not like") return true;
    }
    if (item.id === 26) {
      if (normUser === "doesn t do" || normUser === "doesnt do" || normUser === "does not do") return true;
    }

    return false;
  }

  // Dạng 3: Sắp xếp câu
  if (item.type === 'reorder') {
    const normUser = normalizeText(trimmed);
    const normCorrect = normalizeText(item.correctAnswer);

    if (normUser === normCorrect) return true;

    if (item.acceptedAnswers) {
      for (const alt of item.acceptedAnswers) {
        if (normUser === normalizeText(alt)) return true;
      }
    }
    return false;
  }

  return false;
}
