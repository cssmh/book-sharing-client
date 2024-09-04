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
      setLimit(allBooks?.totalBooks || 6); // Show all books
    } else {
      setLimit(6); // Show only 6 books
    }
  };

  return (
    <div>
      <HavenHelmet title="All Books" />
      <h1 className="text-xl text-center font-bold mt-2 mb-3 mx-3 md:mx-0">
        Total {totalBooks || 0} Books, Total {bookProviders?.length || 0} Book
        Providers, and Total {allBookings?.length || 0} Bookings
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 border-b">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left text-sm">Book Image</th>
              <th className="py-2 px-4 text-left text-sm">Book Name</th>
              <th className="py-2 px-4 text-left text-sm">Provider Name</th>
              <th className="py-2 px-4 text-left text-sm">Location</th>
              <th className="py-2 px-4 text-left text-sm">Status</th>
              <th className="py-2 px-4 text-left text-sm">Details</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
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
                <td colSpan="6" className="py-4 text-center">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {allBooks?.totalBooks > 0 && (
          <div className="text-center mt-4">
            <button
              onClick={handleShowMore}
              className={`px-4 py-2 rounded-3xl text-white transform active:translate-y-0.5 transition-transform duration-150 ease-in-out ${
                limit === 6 ? "bg-green-500" : "bg-blue-500"
              }`}
            >
              {limit === 6 ? "Show All" : "Show Less"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBooks;
