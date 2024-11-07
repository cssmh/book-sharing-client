import useAuth from "../../Hooks/useAuth";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";
import useDataQuery from "../../Hooks/useDataQuery";
import MyPendingCard from "../MyPendingCard/MyPendingCard";
import useIsLarge from "../../Hooks/useIsLarge";

const MyPending = () => {
  const cart = useIsLarge();
  const { loading, user } = useAuth();
  const url = `/providers-books?email=${user?.email}`;
  // to show "You have No added Books" message only
  const { isLoading: myBooksLoading, data: bookData = [] } = useDataQuery(
    ["myBooks"],
    url
  );

  const idUrl = `/unavailable-ids?email=${user?.email}`;
  const {
    isLoading: idLoading,
    data: unavailableIds = [],
    refetch: refetchIds,
  } = useDataQuery(
    ["unavailableIds", user?.email],
    idUrl,
    !loading && !!user?.email
  );

  const pendingUrl = `/my-pending?email=${user?.email}`;
  const {
    isLoading,
    error,
    data: allMyPending = [],
    refetch,
  } = useDataQuery(
    ["myPending", user?.email],
    pendingUrl,
    !loading && !!user?.email
  );

  if (idLoading || myBooksLoading || isLoading) {
    return (
      <div className="max-w-7xl 2xl:max-w-[92%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5">
        {[...Array(cart)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-xl my-2 font-semibold text-red-600 italic">
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
          <div className="max-w-7xl 2xl:max-w-[92%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-4 2xl:gap-5">
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
