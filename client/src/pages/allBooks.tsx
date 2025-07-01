// src/pages/AllBooks.tsx
import { useGetBooksQuery, useDeleteBookMutation } from "../features/Books/BookApi";
import BookCard from "./BookCard";


export default function AllBooks() {
  const { data: books, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      deleteBook(id);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="grid md:grid-cols-2 gap-3 my-10">
      {books?.length === 0 && <p>No books found.</p>}
      {books?.map((book) => (
        <BookCard key={book._id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  );
}
