import axios from "axios";
import { useEffect, useState } from "react";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import noBooks from "../../../assets/noBooks.png";
import useContextHook from "../../../useCustomHook/useContextHook";
import { HashLoader } from "react-spinners";

const AdminBooking = () => {
  const { user } = useContextHook();
  const [adminBookings, setAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://book-sharing-server.vercel.app/allBookingsForAdmin")
      .then((res) => {
        setAdminBookings(res.data);
        setIsLoading(false);
      });
  }, [user?.email]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#FB0F5A" />
        </div>
      ) : (
        <>
          <p className="text-center text-2xl my-4">
            Total Bookings {adminBookings.length}
          </p>
          {adminBookings.length == 0 ? (
            <img src={noBooks} className="mx-auto" alt="" />
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};

export default AdminBooking;