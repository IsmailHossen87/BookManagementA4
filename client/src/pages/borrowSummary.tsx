import { useGetborrowsummaryQuery } from "../features/Borrow/borrowApi";
import dayjs from "dayjs";


export default function BorrowSummary() {
  const { data, isLoading, isError } = useGetborrowsummaryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });


  if (isLoading)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  if (isError)
    return <p className="text-center text-red-500 mt-10">Something went wrong!</p>;

  return (
    <div className="p-4 md:p-8 w-10/12 mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
        📚 Borrow Summary
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                No
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                📖 Title
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                🔢 ISBN
              </th>
              <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                📦 Total Borrowed
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                🕒 Last Due Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data?.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-5 text-gray-500">
                  No borrowed books found.
                </td>
              </tr>
            )}

            {data?.map((item,index) => (
              <tr
                className="hover:bg-gray-50  transition duration-200"
              >
                <td className="px-4 text-center py-3 text-sm text-gray-800">
                  {index + 1}
                </td>
                <td className="px-4 text-center py-3 text-sm text-gray-800">
                  {item.title}
                </td>
                <td className="px-4 text-center py-3 text-sm text-gray-600">
                  {item.isbn}
                </td>
                <td className="px-4 text-center py-3 text-sm  text-gray-900">
                  {item.totalQuantity}
                </td>
                <td>{dayjs(item.dueDate).format("YYYY-MM-DD hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
