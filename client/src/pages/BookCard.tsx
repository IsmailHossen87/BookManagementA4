import { Link } from "react-router";
import type { IBook } from "../Type/type";

interface Props {
  book: IBook;
  onDelete: (id: string) => void;
}

export default function BookCard({ book, onDelete, }: Props) {
  return (
    <div className="w-full h-full p-6  rounded-2xl border border-gray-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between bg-white">
      {/* Content Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Author:</span> {book.author}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Genre:</span> {book.genre}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">ISBN:</span> {book.isbn}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Description:</span> {book.description}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Copies:</span> {book.copies}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Available:</span>{" "}
          {book.available ? "Yes ✅" : "No ❌"}
        </p>
      </div>

      {/* Button Section */}
      <div className="flex justify-between items-center flex-wrap gap-3 mt-6">
        <div className="flex gap-3">
          <Link to={`/books/${book._id}`}>
            <button className="bg-[#3eb3f1] hover:bg-[#f69be4] text-white font-medium py-2 px-4 rounded-lg transition duration-200">
              Edit
            </button>
          </Link>
          <button
            onClick={() => onDelete(book._id)}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Delete
          </button>
        </div>

        <Link to={`/borrow/${book._id}`}>
          <button className="bg-[#89db76] hover:bg-[#c69af2] text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Borrow
          </button>
        </Link>
      </div>
    </div>


  );
}
