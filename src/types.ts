export type VocabularySection =
  | 'GETTING STARTED'
  | 'A CLOSER LOOK 1'
  | 'A CLOSER LOOK 2'
  | 'COMMUNICATION'
  | 'SKILLS 1'
  | 'SKILLS 2'
  | 'LOOKING BACK'
  | 'PROJECT';

export interface VocabularyItem {
  id: number;
  word: string;
  phonetic: string;
  type: string;
  meaning: string;
  exampleEn: string;
  exampleVi: string;
  section: VocabularySection;
  related?: string;
}

export type ExerciseType = 'mcq' | 'fill_blank_verb' | 'fill_blank_word' | 'reorder';
export type ExerciseCategory = 'DẠNG 1: TRẮC NGHIỆM' | 'DẠNG 2: ĐIỀN VÀO CHỖ TRỐNG' | 'DẠNG 3: SẮP XẾP CÂU';

export interface ExerciseItem {
  id: number;
  type: ExerciseType;
  category: ExerciseCategory;
  subcategory?: string;
  prompt: string;
  options?: string[]; // For MCQ (A, B, C, D)
  wordBank?: string[]; // For fill in blank box or reorder
  sentenceTemplate?: string; // For fill in blank with input field
  correctAnswer: string; // canonical answer or normalized
  acceptedAnswers?: string[]; // Alternative spellings or formats
  explanation: string;
}

export interface StudentScore {
  name: string;
  answers: Record<number, string>; // questionId -> answer
  checked: Record<number, boolean>; // questionId -> has been checked
}
