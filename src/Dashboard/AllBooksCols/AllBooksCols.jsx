import { useQuery } from "@tanstack/react-query";
import { HashLoader } from "react-spinners";
import AllBooksRow from "../AllBooksRow/AllBooksRow";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useBookProviders from "../../Hooks/useBookProviders";

const AllBooksCols = () => {
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
  });

  const { data: allBookings, isLoading: bookingLoading } = useQuery({
    queryKey: ["allBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-bookings");
      return res?.data;
    },
  });

  if (isLoading || bookingLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#00CC66" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-xl mb-5">All Books</h1>
      <p className="text-center text-lg md:text-2xl my-4 mx-5 md:mx-0">
        Total {allBooks?.length} Books, Total {uniqueEmails?.length} Book
        Providers and Total {allBookings?.length} Bookings
      </p>
      <div className="overflow-x-auto">
        <table className="table max-w-7xl mx-auto">
          <thead>
            <tr>
              <th className="bg-yellow-400 text-white rounded-md">
                Book Image
              </th>
              <th className="bg-yellow-400 text-white rounded-md">Book Name</th>
              <th className="bg-yellow-400 text-white rounded-md">
                Provider Name
              </th>
              <th className="bg-yellow-400 text-white rounded-md">Location</th>
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
    </div>
  );
};

export default AllBooksCols;
