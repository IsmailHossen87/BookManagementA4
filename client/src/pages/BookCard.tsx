import { Link } from "react-router";
import type { IBook } from "../Type/type";

interface Props {
  book: IBook;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onDelete }: Props) {
  return (
    <div className="bg-white rounded-2xl mx-4 shadow-md p-6 mb-4 border border-gray-200 hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{book.title}</h2>
      <p className="text-sm text-gray-600"><span className="font-semibold">Author:</span> {book.author}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Genre:</span> {book.genre}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">ISBN:</span> {book.isbn}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Description:</span> {book.description}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Copies:</span> {book.copies}</p>
      <p className="text-sm text-gray-600"><span className="font-semibold">Available:</span> {book.available ? "Yes ✅" : "No ❌"}</p>

      <div className="flex justify-between">
        <button
          onClick={() => onDelete(book._id)}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Delete
        </button>
       <Link to={`/borrow/${book._id}`}>
        <button
          className="mt-4 bg-emerald-400 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Borrow
        </button>
       </Link>
      </div>
    </div>
  );
}
