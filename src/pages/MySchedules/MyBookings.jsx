import MyBookingCard from "./MyBookingCard";
import { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import axios from "axios";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);

  const url = `http://localhost:5000/bookings?email=${user.email}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setAllBookings(res.data);
        setLoading(false);
      })
      .then((err) => console.log(err));
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#6cc262"
          width="70"
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
