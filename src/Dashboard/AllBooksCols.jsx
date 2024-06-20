import { useQuery } from "@tanstack/react-query";
import AllBooksRow from "./AllBooksRow";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useBookProviders from "../Hooks/useBookProviders";
import SmallLoader from "../Components/AllLoader/SmallLoader";
import useQueryPublic from "../Hooks/useQueryPublic";

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
      <p className="text-center text-xl md:text-2xl my-4 mx-5 md:mx-0">
        Total {totalBooks || 0} Books, Total {bookProviders?.length || 0} Book
        Providers and Total {allBookings?.length || 0} Bookings
      </p>
      {isLoading || bookingLoading ? (
        <SmallLoader />
      ) : (
        <div className="overflow-x-auto">
          <table className="table max-w-7xl mx-auto">
            <thead>
              <tr>
                <th className="bg-yellow-400 text-white rounded-md">
                  Book Image
                </th>
                <th className="bg-yellow-400 text-white rounded-md">
                  Book Name
                </th>
                <th className="bg-yellow-400 text-white rounded-md">
                  Provider Name
                </th>
                <th className="bg-yellow-400 text-white rounded-md">
                  Location
                </th>
                <th className="bg-yellow-400 text-white rounded-md">Status</th>
                <th className="bg-yellow-400 text-white rounded-md">Details</th>
              </tr>
            </thead>
            <tbody>
              {allBooks?.result?.map((books) => (
                <AllBooksRow
                  key={books._id}
                  getBooks={books}
                  refetch={refetch}
                ></AllBooksRow>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllBooksCols;
