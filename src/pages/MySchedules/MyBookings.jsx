import MyBookingCard from "./MyBookingCard";
import { useEffect, useState } from "react";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { FallingLines } from "react-loader-spinner";

const MyBookings = () => {
  const { user } = useContextHook();
  const [loading, setLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);
  const axiosCustom = useAxiosHook();

  const url = `/bookings?email=${user.email}`;
  useEffect(() => {
    axiosCustom?.get(url)?.then((res) => {
      setAllBookings(res.data);
      setLoading(false);
    });
  }, [axiosCustom, url]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#9933FF"
          width="60"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-lg md:text-2xl my-6 font-semibold italic">
        All Bookings made by you
      </h2>
      {allBookings.length == 0 ? (
        <p className="text-center text-2xl font-semibold italic">No Booked</p>
      ) : (
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
      )}
    </div>
  );
};

export default MyBookings;
