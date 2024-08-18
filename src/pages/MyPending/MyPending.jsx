import MyPendingCard from "../MyPendingCard/MyPendingCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useProvBooks from "../../Hooks/useProvBooks";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";

const MyPending = () => {
  const { loading, user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const url = `/providers-books?email=${user?.email}`;
  // to show "You have No added Books" message only
  const { isLoading: myBooksLoading, bookData } = useProvBooks(url);

  const {
    isLoading: idLoading,
    data: unavailableIds = [],
    refetch: refetchIds,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["unavailableIds", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/unavailable-ids?email=${user?.email}`
      );
      return res.data?.map((book) => book._id);
    },
  });

  const {
    isLoading,
    error,
    data: allMyPending = [],
    refetch,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["allMyPending", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pending?email=${user?.email}`);
      return res?.data;
    },
  });

  if (idLoading || myBooksLoading || isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 p-2 md:p-4 md:mx-4">
        {[...Array(3)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
        An error occurred while fetching your Pending.
      </div>
    );
  }

  return (
    <div>
      {bookData.length === 0 ? (
        <p className="text-center text-xl my-2 font-semibold text-red-600 italic">
          You have no added books.
        </p>
      ) : allMyPending?.length === 0 ? (
        <p className="text-center text-xl my-2 font-semibold text-red-600 italic">
          No user has booked your books.
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl my-2 font-semibold">
            <span className="italic">Pending Bookings</span> (
            {allMyPending?.length || 0})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-4 gap-4 mt-3 mb-5 md:mx-5">
            {allMyPending?.map((pending) => (
              <MyPendingCard
                key={pending._id}
                getPending={pending}
                unavailableIds={unavailableIds}
                refetch={refetch}
                refetchIds={refetchIds}
              ></MyPendingCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyPending;
