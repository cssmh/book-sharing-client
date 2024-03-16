import axios from "axios";
import { useEffect, useState } from "react";
import BookingCard from "./BookingCard/BookingCard";

const Admin = () => {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/allBookings")
      .then((res) => setAllBookings(res.data));
  }, []);
  return (
    <div>
      <p className="text-center text-2xl my-4">Total Bookings {allBookings.length}</p>
      <div className="space-y-5">
        {allBookings.map((booking) => (
          <BookingCard key={booking._id} getAllBooking={booking}></BookingCard>
        ))}
      </div>
    </div>
  );
};

export default Admin;
