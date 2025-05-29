// types/database.ts
export interface User {
  id: string;
  social_id: string;
  provider: "google" | "apple" | "kakao";
  created_at: string;
}

export interface Book {
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

export interface BookWord {
  id: string;
  book_id: string;
  word_id: string;
  order: number;
  created_at: string;
}

export interface UserBook {
  id: string;
  user_id: string;
  book_id: string;
  selected_at: string;
}

export interface UserWordProgress {
  id: string;
  user_id: string;
  book_id: string;
  word_id: string;
  phase: string | null;
  last_seen_at: string | null;
  wrong_count: number;
  is_marked_difficult: boolean;
}

// 조합된 타입들
export interface WordWithMeaningList extends Word {
  meanings: Meaning[];
}

export interface BookWithWordList extends Book {
  words: WordWithMeaningList[];
}

export interface BookSummary extends Book {
  word_count: number;
}

export interface BookWithWordCount extends Book {
  book_words: { count: number }[];
}

export interface UserBookWithWordCount {
  books: BookWithWordCount;
}
