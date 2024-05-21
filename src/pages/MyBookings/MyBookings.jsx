import { FallingLines } from "react-loader-spinner";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import useContextHook from "../../useCustomHook/useContextHook";
import MyBookingCard from "../MyBookingCard/MyBookingCard";
import { useQuery } from "@tanstack/react-query";

const MyBookings = () => {
  const { user } = useContextHook();
  const axiosSecure = useAxiosHook();

  const getMyBookings = async () => {
    const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
    return res?.data;
  };

  const {
    isLoading,
    error,
    data: myBookings,
    refetch,
  } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: getMyBookings,
    enabled: !!user?.email, // Ensure the query runs only when the email is available
  });

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
