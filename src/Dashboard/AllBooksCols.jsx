import { useQuery } from "@tanstack/react-query";
import AllBooksRow from "./AllBooksRow";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useBookProviders from "../Hooks/useBookProviders";
import useAuth from "../Hooks/useAuth";
import SmallLoader from "../Components/AllLoader/SmallLoader";

const AllBooksCols = () => {
  const { user } = useAuth();
  const axiosNoToken = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { uniqueEmails } = useBookProviders();

  const {
    data: allBooks,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books");
      return res.data?.result;
    },
    enabled: !!user,
  });

  const { data: allBookings, isLoading: bookingLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-bookings");
      return res?.data;
    },
  });

  return (
    <div>
      <h1 className="text-center text-xl mb-5">All Books</h1>
      <p className="text-center text-lg md:text-2xl my-4 mx-5 md:mx-0">
        Total {allBooks?.length || 0} Books, Total {uniqueEmails?.length || 0}{" "}
        Book Providers and Total {allBookings?.length || 0} Bookings
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
              {allBooks?.map((books) => (
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
