import { fetchAllBookList } from "@/api/book";
import type { ComposedEntity } from "@/types/database";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import BookCard from "./components/BookCard";

function BookPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataList, setDataList] = useState<ComposedEntity.BookSummary[]>([]);

  const navigation = useNavigate();

  const loadBookList = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllBookList();
      setDataList(data);
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
    loadBookList();
  }, []);

  if (isLoading) return <>로딩중</>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {dataList?.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onClick={() => navigation(`/bookdetail/${book.id}`)}
        />
      ))}
    </div>
  );
}

export default BookPage;
