import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetBookQuery, useUpdateBookMutation } from "../../features/Books/BookApi";
import type { IBook } from "../../Type/type";
import React from "react";


export default function EditBookForm() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading, isError } = useGetBookQuery(bookId || "");
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();

  // Reset form when book data arrives
  React.useEffect(() => {
    if (book) {
      reset(book);
    }
  }, [book, reset]);

  const onSubmit = async (data: IBook) => {
    try {
      await updateBook({ id: bookId!, data }).unwrap();
      alert("✅ Book updated successfully!");
      navigate("/allBooks");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update book.");
    }
  };

  if (isLoading) return <div className="text-center mt-10 text-lg">Loading book data...</div>;
  if (isError || !book) return <div className="text-center mt-10 text-red-600">Failed to load book data</div>;

  return (
    <div className="md:flex items-center justify-center my-6 mx-4 md:mx-0">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:w-2/3">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">✏️ Edit Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 font-medium">Author *</label>
            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-1 font-medium">Genre *</label>
            <input
              type="text"
              {...register("genre", { required: "Genre is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          {/* ISBN */}
          <div>
            <label className="block mb-1 font-medium">ISBN *</label>
            <input
              type="text"
              {...register("isbn", { required: "ISBN is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description *</label>
            <textarea
              {...register("description", { required: "Description is required" })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={3}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>

          {/* Copies */}
          <div>
            <label className="block mb-1 font-medium">Copies *</label>
            <input
              type="number"
              {...register("copies", {
                required: "Copies is required",
                valueAsNumber: true,
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.copies && <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>}
          </div>

          {/* Available */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register("available")}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isUpdating}
              className="w-6/12 flex justify-center bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isUpdating ? "Updating..." : "Update Book"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
