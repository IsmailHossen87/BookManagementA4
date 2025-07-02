import { Link } from "react-router";
import { useGetBooksQuery, useDeleteBookMutation } from "../features/Books/BookApi";
import BookCard from "./BookCard";
import Swal from 'sweetalert2'


export default function AllBooks() {
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
        deleteBook(id); // Call your delete function here

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
    <>
     <div className="text-end mr-4">
       <Link to={"/addBook"}>
        <button  className="mt-4 bg-green-600  hover:bg-green-400 text-white font-medium py-2 px-4 rounded-lg transition">Add Books</button>
        </Link>
         </div>
      <div className="grid md:grid-cols-2 gap-3 my-10">
        {books?.length === 0 && <p>No books found.</p>}
        {books?.map((book) => (
          <BookCard key={book._id} book={book} onDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}
