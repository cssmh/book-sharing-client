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
      <p className="text-center md:text-[22px] my-3 mx-5 md:mx-0">
        Total {totalBooks || 0} Books, Total {bookProviders?.length || 0} Book
        Providers and Total {allBookings?.length || 0} Bookings
      </p>
      {isLoading || bookingLoading ? (
        <BooksColsSke />
      ) : (
        <div className="overflow-x-auto">
          <table className="table max-w-7xl mx-auto">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="bg-yellow-400 text-white rounded-tl-md py-2 px-4">
                  Book Image
                </th>
                <th className="bg-yellow-400 text-white py-2 px-4">
                  Book Name
                </th>
                <th className="bg-yellow-400 text-white py-2 px-4">
                  Provider Name
                </th>
                <th className="bg-yellow-400 text-white py-2 px-4">Location</th>
                <th className="bg-yellow-400 text-white py-2 px-4">Status</th>
                <th className="bg-yellow-400 text-white rounded-tr-md py-2 px-4">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {allBooks?.result?.map((books) => (
                <AllBooksRow
                  key={books._id}
                  getBooks={books}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooksCols;
