import { FallingLines } from "react-loader-spinner";
import MyBookingCard from "../MyBookingCard/MyBookingCard";
import useMyCart from "../../Shared/useCustomHook/useMyCart";

const MyBookings = () => {
  const { myBookings, error, refetch, isLoading } = useMyCart();

  if (isLoading) {
    return (
      <div className="flex justify-center md:mt-[6px]">
        <FallingLines
          color="#9933FF"
          width="55"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
        An error occurred while fetching your bookings.
      </div>
    );
  }

  return (
    <div>
      {myBookings.length === 0 ? (
        <p className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
          You have No Booking
        </p>
      ) : (
        <>
          <h2 className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold italic">
            All Bookings made by you
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {myBookings.map((booking) => (
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
