import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetBookQuery } from "../../../features/Books/BookApi";
import { useBorrowBookMutation } from "../../../features/Borrow/borrowApi";
import type { IBorrow } from "../../../Type/type";
import { useNavigate } from "react-router";

export default function BorrowSingleBookForm() {
  const { bookId } = useParams();
  const navigate = useNavigate()
  const { data: book, isLoading, refetch } = useGetBookQuery(bookId || "");


  // step 1
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBorrow>();
  // step 2
  const [borrowBook, { isLoading: borrowing }] = useBorrowBookMutation();


  // step 3
  const onSubmit = async (data: IBorrow) => {
    if (!bookId || !book) return;
    const borrowData = {
      ...data,
      book: book._id
    }

    try {
      await borrowBook(borrowData).unwrap();
      reset();
      refetch();
      alert("✅ Book borrowed successfully!");
      navigate("/borrowSummary")
    } catch (error) {
      console.error("Borrow error:", error);
      alert("❌ Failed to borrow book.");
    }
  };

  if (isLoading || !book)
    return <div className="text-center mt-6">Loading book info...</div>;

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">📚 Borrow: {book.title}</h2>

      <div className="bg-gray-100 p-4 rounded-md text-sm mb-4">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Available Copies:</strong> {book.copies}</p>
        <p><strong>Description:</strong> {book.description}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block mb-1 font-medium">Quantity *</label>
          <input
            type="number"
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Minimum 1 copy required" },
              max: { value: book.copies, message: `Only ${book.copies} available` },
              valueAsNumber: true,
            })}
            className={`w-full border ${errors.quantity ? "border-red-500" : "border-gray-300"} rounded px-4 py-2`}
          />
          {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
        </div>

        {/* Due Date */}
        <div>
          <label className="block mb-1 font-medium">Due Date *</label>
          <input
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
            className={`w-full border ${errors.dueDate ? "border-red-500" : "border-gray-300"} rounded px-4 py-2`}
          />
          {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={borrowing || book.copies === 0}
          className={`w-full py-2 rounded-md transition text-white ${book.copies === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"}`}>
          {/* show name */}
          {book.copies === 0
            ? "Unvailable"
            : borrowing
              ? "Borrowing..."
              : "Confirm Borrow"}

        </button>

      </form>
    </div>
  );
}
