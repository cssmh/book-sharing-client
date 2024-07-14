import MyBookingCard from "../MyBookingCard/MyBookingCard";
import useMyCart from "../../Hooks/useMyCart";
import MyBookSke from "../../Components/AllSkeleton/MyBookSke";

const MyBookings = () => {
  const { isLoading, myBookings, error, cartRefetch } = useMyCart();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(3)].map((_, index) => (
          <MyBookSke key={index} />
        ))}
      </div>
    )
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
          You have No Booking
        </p>
      ) : (
        <>
          <h2 className="text-center text-xl my-2 font-semibold italic">
            All Bookings made by you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 mb-8">
            {myBookings?.map((booking) => (
              <MyBookingCard
                key={booking._id}
                getBooking={booking}
                refetch={cartRefetch}
              ></MyBookingCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyBookings;
