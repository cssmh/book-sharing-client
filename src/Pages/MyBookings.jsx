import MyBookingCard from "./MyBookingCard";
import MyBookSke from "../Components/AllSkeleton/MyBookSke";
import useMyCart from "../Hooks/useMyCart";
import useIsLarge from "../Hooks/useIsLarge";

const MyBookings = () => {
  const cart = useIsLarge();
  const { isLoading, myBookings, refetch, error } = useMyCart();

  if (isLoading) {
    return (
      <div className="container 2xl:max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5">
        {[...Array(cart)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl my-2 font-semibold text-red-600 italic">
        An error occurred while fetching your bookings.
      </div>
    );
  }

  return (
    <div>
      {myBookings?.length === 0 ? (
        <p className="text-center text-xl my-2 font-semibold text-red-600 italic">
          You have no bookings.
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl my-2 font-semibold">
            <span className="italic">Your Bookings</span> (
            {myBookings?.length || 0})
          </h2>
          <div className="container 2xl:max-w-[1370px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 md:gap-5">
            {myBookings?.map((booking) => (
              <MyBookingCard
                key={booking._id}
                getBooking={booking}
                refetch={refetch}
              ></MyBookingCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
