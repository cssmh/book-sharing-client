import MyBookingCard from "./MyBookingCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [allBookings, setAllBookings] = useState([]);

  const url = `https://book-sharing-server.vercel.app/bookings?email=${user.email}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => setAllBookings(res.data));
  }, [url]);

  return (
    <div>
      <h2 className="text-center text-lg md:text-2xl my-6 font-semibold italic">
        All Bookings made by you
      </h2>
      {allBookings.length == 0 ? (
        <p className="text-center text-2xl font-semibold italic">No Booked</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
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
