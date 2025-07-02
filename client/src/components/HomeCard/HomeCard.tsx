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
  return (
    <div className="grid md:grid-cols-3 my-4 md:my-10">
      {books?.slice(0,3).map((book) => (
        <BookCard key={book._id} book={book} onDelete={handleDelete} />
      ))}
    </div>
  )
}

