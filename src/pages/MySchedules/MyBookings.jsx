import MyBookingCard from "./MyBookingCard";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { FallingLines } from "react-loader-spinner";

const MyBookings = () => {
  const { user } = useContextHook();
  const [isLoading, setIsLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);
  const { axiosSecure } = useAxiosHook();

  const url = `/bookings?email=${user?.email}`;
  useEffect(() => {
    axiosSecure.get(url)?.then((res) => {
      setAllBookings(res?.data);
      setIsLoading(false);
    });
  }, [axiosSecure, url]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center">
          <FallingLines
            color="#9933FF"
            width="55"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div>
          {allBookings.length == 0 ? (
            <p className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
              You have No Booking
            </p>
          ) : (
            <>
              <h2 className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold italic">
                All Bookings made by you
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {allBookings.map((booking) => (
                  <MyBookingCard
                    key={booking._id}
                    getBooking={booking}
                    allBookings={allBookings}
                    setAllBookings={setAllBookings}
                  ></MyBookingCard>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
