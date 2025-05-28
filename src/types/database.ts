// types/database.ts
export interface User {
  id: string;
  social_id: string;
  provider: "google" | "apple";
  created_at: string;
}

export interface VocabularyBook {
  id: string;
  title: string;
  description: string | null;
  tags: string[];
  creator_id: string | null;
  is_public: boolean;
  created_at: string;
}

export interface Word {
  id: string;
  text: string;
  phonetic: string | null;
  created_at: string;
}

export interface Meaning {
  id: string;
  word_id: string;
  definition: string;
  example_sentence: string | null;
  part_of_speech: string;
  order: number;
  created_at: string;
}

export interface VocabularyBookWord {
  id: string;
  vocabulary_book_id: string;
  word_id: string;
  order: number;
  created_at: string;
}

export interface UserVocabularyBook {
  id: string;
  user_id: string;
  vocabulary_book_id: string;
  selected_at: string;
}

export interface UserWordProgress {
  id: string;
  user_id: string;
  vocabulary_book_id: string;
  // 추가 학습 관련 필드들이 필요할 수 있습니다
}

// 조합된 타입들
export interface WordWithMeanings extends Word {
  meanings: Meaning[];
}

export interface VocabularyBookWithWords extends VocabularyBook {
  words: WordWithMeanings[];
}

export interface VocabularyBookSummary extends VocabularyBook {
  word_count: number;
}
