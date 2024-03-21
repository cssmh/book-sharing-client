import { useEffect, useState } from "react";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import useContextHook from "../../../useCustomHook/useContextHook";
import noBooks from "../../../assets/noBooks.png";
import { HashLoader } from "react-spinners";
import { Link, useLoaderData } from "react-router-dom";

const AdminBooking = () => {
  const { user } = useContextHook();
  const loadAllBooks = useLoaderData();
  const [adminBookings, setAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCustom = useAxiosHook();

  const url = `/allBookings?email=${user?.email}`;
  useEffect(() => {
    axiosCustom?.get(url)?.then((res) => {
      setAdminBookings(res.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#FB0F5A" size={36} />
        </div>
      ) : (
        <>
          <p className="text-center text-lg lg:text-2xl my-4">
            Total Books <Link to={"/all-books"}>{loadAllBooks.length}</Link> and
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
