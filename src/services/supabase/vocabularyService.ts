// lib/services/vocabularyService.ts

import { supabase } from "../../lib/supabase/client";
import type {
  VocabularyBook,
  VocabularyBookSummary,
  VocabularyBookWithWords,
  WordWithMeanings,
} from "../../types/database";

export class VocabularyService {
  /**
   * 모든 공개 단어장 목록을 가져옵니다
   */
  static async getPublicVocabularyBooks(): Promise<VocabularyBookSummary[]> {
    const { data, error } = await supabase
      .from("vocabulary_books")
      .select(
        `
        *,
        vocabulary_book_words(count)
      `
      )
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(
        `단어장 목록을 가져오는데 실패했습니다: ${error.message}`
      );
    }

    return data.map((book) => ({
      ...book,
      word_count: book.vocabulary_book_words?.[0]?.count || 0,
    }));
  }

  /**
   * 특정 사용자의 단어장 목록을 가져옵니다
   */
  static async getUserVocabularyBooks(
    userId: string
  ): Promise<VocabularyBookSummary[]> {
    const { data, error } = await supabase
      .from("user_vocabulary_books")
      .select(
        `
        vocabulary_books(*,
          vocabulary_book_words(count)
        )
      `
      )
      .eq("user_id", userId)
      .order("selected_at", { ascending: false });

    if (error) {
      throw new Error(
        `사용자 단어장을 가져오는데 실패했습니다: ${error.message}`
      );
    }

    return data.map((item) => ({
      ...item.vocabulary_books,
      word_count: item.vocabulary_books.vocabulary_book_words?.[0]?.count || 0,
    }));
  }

  /**
   * 단어장 ID로 단어장과 포함된 단어들을 가져옵니다
   */
  static async getVocabularyBookWithWords(
    bookId: string
  ): Promise<VocabularyBookWithWords | null> {
    // 먼저 단어장 정보를 가져옵니다
    const { data: bookData, error: bookError } = await supabase
      .from("vocabulary_books")
      .select("*")
      .eq("id", bookId)
      .single();

    if (bookError || !bookData) {
      throw new Error(`단어장을 찾을 수 없습니다: ${bookError?.message}`);
    }

    // 단어장에 포함된 단어들과 의미를 가져옵니다
    const { data: wordsData, error: wordsError } = await supabase
      .from("vocabulary_book_words")
      .select(
        `
        words(*,
          meanings(*)
        )
      `
      )
      .eq("vocabulary_book_id", bookId)
      .order("order", { ascending: true });

    if (wordsError) {
      throw new Error(`단어를 가져오는데 실패했습니다: ${wordsError.message}`);
    }

    const wordsWithMeanings: WordWithMeanings[] = wordsData.map((item) => ({
      ...item.words,
      meanings: item.words.meanings.sort((a, b) => a.order - b.order),
    }));

    return {
      ...bookData,
      words: wordsWithMeanings,
    };
  }

  /**
   * 사용자가 단어장을 선택합니다
   */
  static async selectVocabularyBook(
    userId: string,
    bookId: string
  ): Promise<void> {
    // 이미 선택된 단어장인지 확인
    const { data: existingData } = await supabase
      .from("user_vocabulary_books")
      .select("id")
      .eq("user_id", userId)
      .eq("vocabulary_book_id", bookId)
      .single();

    if (existingData) {
      // 이미 선택된 경우 selected_at 업데이트
      const { error } = await supabase
        .from("user_vocabulary_books")
        .update({ selected_at: new Date().toISOString() })
        .eq("id", existingData.id);

      if (error) {
        throw new Error(
          `단어장 선택 업데이트에 실패했습니다: ${error.message}`
        );
      }
    } else {
      // 새로 선택하는 경우
      const { error } = await supabase.from("user_vocabulary_books").insert({
        user_id: userId,
        vocabulary_book_id: bookId,
        selected_at: new Date().toISOString(),
      });

      if (error) {
        throw new Error(`단어장 선택에 실패했습니다: ${error.message}`);
      }
    }
  }

  /**
   * 단어장 검색
   */
  static async searchVocabularyBooks(
    query: string
  ): Promise<VocabularyBookSummary[]> {
    const { data, error } = await supabase
      .from("vocabulary_books")
      .select(
        `
        *,
        vocabulary_book_words(count)
      `
      )
      .eq("is_public", true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`단어장 검색에 실패했습니다: ${error.message}`);
    }

    return data.map((book) => ({
      ...book,
      word_count: book.vocabulary_book_words?.[0]?.count || 0,
    }));
  }
}
