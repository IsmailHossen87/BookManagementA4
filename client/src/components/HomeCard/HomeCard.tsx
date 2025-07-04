import Swal from "sweetalert2";
import { useDeleteBookMutation, useGetBooksQuery } from "../../features/Books/BookApi";
import BookCard from "../../pages/BookCard";

export default function HomeCard() {
  const { data: books, isLoading, isError } = useGetBooksQuery(undefined, { refetchOnMountOrArgChange: true });
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id);

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          📚 Explore Our Library
        </h2>
        <p className="text-gray-500 mt-2">
          Discover books across genres, topics, and authors
        </p>
      </div>



      <div className="grid md:grid-cols-3 mx-4 gap-5  md:my-10">
        {books?.slice(0, 3).map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}

