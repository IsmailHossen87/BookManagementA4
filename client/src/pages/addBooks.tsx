import { useForm } from 'react-hook-form';
import type { IBook } from '../Type/type';
import { useNavigate } from 'react-router';
import { useCreateBookMutation } from '../features/Books/BookApi';

export default function AddBooks() {
  const navigate = useNavigate();


  // step 1
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IBook>();
  // step 2
  const [createLibrary, { isLoading, isError }] = useCreateBookMutation();


  // step 3
  const onSubmit = async (data: IBook) => {
    try {
      await createLibrary(data).unwrap();
      alert("✅ Book borrowed successfully!");
      reset();
      navigate('/allBooks');
    } catch (error) {
      console.error('Submission error:', error);
      alert("❌ Failed to borrow book.");
    }
  };

  if (isLoading) return <div className="text-center  text-lg">Loading...</div>;
  if (isError) return <div className="text-center mt-10 text-red-600">Something went wrong!</div>;

  return (
    <div className="md:flex items-center justify-center mb-10 mx-4 md:mx-0">
      <div className="bg-white shadow-xl rounded-2xl p-8  md:w-2/3">
        <h2 className="text-2xl font-bold mt-6 text-center text-gray-800">📚 Add New Book</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title */}
          <div>
            <label className="block mb-1 font-medium">Title *</label>
            <input
              type="text"
              {...register('title', { required: 'Title is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Author */}
          <div>
            <label className="block mb-1 font-medium">Author *</label>
            <input
              type="text"
              {...register('author', { required: 'Author is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
          </div>

          {/* Genre */}
          <div>
            <label className="block mb-1 font-medium">Genre *</label>
            <input
              type="text"
              {...register('genre', { required: 'Genre is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre.message}</p>}
          </div>

          {/* ISBN */}
          <div>
            <label className="block mb-1 font-medium">ISBN *</label>
            <input
              type="text"
              {...register('isbn', { required: 'ISBN is required' })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Description *</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
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
              {...register('copies', {
                required: 'Copies is required',
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
              {...register('available')}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Available</label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-6/12 flex justify-center bg-[rgb(229,101,3)] text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
