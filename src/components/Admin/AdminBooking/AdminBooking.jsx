import axios from "axios";
import { useEffect, useState } from "react";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import noBooks from "../../../assets/noBooks.png"

const AdminBooking = () => {
  const [adminBookings, setAdminBookings] = useState([]);

  useEffect(() => {
    axios
      .get("https://book-sharing-server.vercel.app/allBookings")
      .then((res) => setAdminBookings(res.data));
  }, []);

  return (
    <div>
      <p className="text-center text-2xl my-4">
        Total Bookings {adminBookings.length}
      </p>
      {adminBookings.length == 0 && (
        <img src={noBooks} className="mx-auto" alt="" />
      )}
      <div className="space-y-5">
        {adminBookings.map((booking) => (
          <AdminBookingCard
            key={booking._id}
            getAllBooking={booking}
            adminBookings={adminBookings}
            setAdminBookings={setAdminBookings}
          ></AdminBookingCard>
        ))}
      </div>
    </div>
  );
};

export default AdminBooking;
