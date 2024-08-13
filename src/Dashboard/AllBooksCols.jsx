import { useQuery } from "@tanstack/react-query";
import AllBooksRow from "./AllBooksRow";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useBookProviders from "../Hooks/useBookProviders";
import useQueryPublic from "../Hooks/useQueryPublic";
import { Helmet } from "react-helmet-async";
import BooksColsSke from "../Components/AllSkeleton/BooksColsSke";

const AllBooksCols = () => {
  const axiosSecure = useAxiosSecure();
  const { totalBooks, bookProviders } = useBookProviders();

  const {
    isLoading,
    data: allBooks,
    refetch,
  } = useQueryPublic(["allBooks"], "/all-books");

  const { data: allBookings, isLoading: bookingLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-bookings");
      return res?.data;
    },
  });

  return (
    <div>
      <Helmet>
        <title>BookHaven | All Books</title>
      </Helmet>
      <h1 className="text-lg text-center font-bold mt-2 mb-3">
        Total {totalBooks || 0} Books, Total {bookProviders?.length || 0} Book
        Providers, and Total {allBookings?.length || 0} Bookings
      </h1>
      {isLoading || bookingLoading ? (
        <BooksColsSke />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left text-sm">Book Image</th>
                <th className="py-3 px-4 text-left text-sm">Book Name</th>
                <th className="py-3 px-4 text-left text-sm">Provider Name</th>
                <th className="py-3 px-4 text-left text-sm">Location</th>
                <th className="py-3 px-4 text-left text-sm">Status</th>
                <th className="py-3 px-4 text-left text-sm">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allBooks?.result?.map((book) => (
                <AllBooksRow key={book._id} getBooks={book} refetch={refetch} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooksCols;
