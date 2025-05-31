// types/database/composed-entity.ts
// 조합된 타입들 (클라이언트용)
import type { Book, Definition, Word } from "./entities";

export interface WordWithDefinitionList extends Word {
  definitions: Definition[];
}

export interface BookWithWordList extends Book {
  words: WordWithDefinitionList[];
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
