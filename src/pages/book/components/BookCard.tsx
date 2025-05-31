import type { ComposedEntity } from "@/types/database";
import Card, {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BookCardProps {
  book: ComposedEntity.BookSummary;
  onClick: (bookId: string) => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const handleClick = () => {
    onClick(book.id);
  };

  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between align-end">
            <p className="">{book.title}</p>
            <p>{book.word_count}개 단어</p>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex justify-between align-end">
            <p>{book.description}</p>
            <p>{new Date(book.created_at).toLocaleDateString("ko-KR")}</p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-gray-500"></span>
      </CardContent>
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
}
