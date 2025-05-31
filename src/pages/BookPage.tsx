import { fetchAllBookList } from "@/api/book";
import type { ComposedEntity } from "@/types/database";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
    <div>
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

interface BookCardProps {
  book: ComposedEntity.BookSummary;
  onClick: (bookId: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  const handleClick = () => {
    onClick(book.id);
  };

  return (
    <div
      className="border rounded-lg p-4 cursor-pointer transition-all duration-200 border-gray-200 hover:border-gray-300 hover:shadow-sm"
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {book.title}
        </h3>
      </div>

      {book.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {book.description}
        </p>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{book.word_count}개 단어</span>

        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
              >
                {tag}
              </span>
            ))}
            {book.tags.length > 2 && (
              <span className="text-xs text-gray-400">
                +{book.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-400">
        {new Date(book.created_at).toLocaleDateString("ko-KR")}
      </div>
    </div>
  );
};
