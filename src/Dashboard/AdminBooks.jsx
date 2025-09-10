import { useState } from "react";
import AdminBooksRow from "./AdminBooksRow";
import useBookProviders from "../Hooks/useBookProviders";
import SmallLoader from "../Components/SmallLoader";
import useDataQuery from "../Hooks/useDataQuery";
import HavenHelmet from "../Components/HavenHelmet";

const AdminBooks = () => {
  const { totalBooks, bookProviders } = useBookProviders();
  const [limit, setLimit] = useState(6);

  const {
    isLoading,
    data: allBooks,
    refetch,
  } = useDataQuery(["allBooks", limit], `/all-books?limit=${limit}`);

  const { data: allBookings, isLoading: bookingLoading } = useDataQuery(
    ["allBookings"],
    "/all-bookings"
  );

  const handleShowMore = () => {
    if (limit === 6) {
      setLimit(allBooks?.totalBooks || 6);
    } else {
      setLimit(6);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl px-6 py-6">
      <HavenHelmet title="All Books" />
      <h1 className="text-xl text-center font-bold mb-4 text-gray-800">
        Total {totalBooks || 0} Books, {bookProviders?.length || 0} Book
        Providers, and {allBookings?.length || 0} Bookings
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Book
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Book Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Provider
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Location
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading || bookingLoading ? (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  <SmallLoader size={75} />
                </td>
              </tr>
            ) : allBooks?.result?.length ? (
              allBooks.result.map((book) => (
                <AdminBooksRow
                  key={book._id}
                  getBooks={book}
                  refetch={refetch}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {allBooks?.totalBooks > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={handleShowMore}
              className={`px-6 py-2 rounded-full font-semibold text-white transition-colors duration-200 ${
                limit === 6
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {limit === 6 ? "Show All Books" : "Show Less"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
