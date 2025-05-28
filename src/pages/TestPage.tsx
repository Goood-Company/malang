import { useEffect, useState } from "react";
import { VocabularyService } from "../services/supabase/vocabularyService";

export default function TestPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadVocabularyBooks = async () => {
    try {
      setIsLoading(true);
      const data = await VocabularyService.getPublicVocabularyBooks();
      console.log("data : ", data);
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "단어장을 불러오는데 실패했습니다"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVocabularyBooks();
  }, []);

  return <div>{isLoading ? "로딩중" : "완료"}</div>;
}
