import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import useContextHook from "../../../useCustomHook/useContextHook";
import useTotalProviderHook from "../../../useCustomHook/useTotalProviderHook";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import swal from "sweetalert";
import { HashLoader } from "react-spinners";

const AdminBooking = () => {
  const { user } = useContextHook();
  const { result } = useLoaderData();
  const [adminBookings, setAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosCustom = useAxiosHook();
  const { uniqueEmails } = useTotalProviderHook();

  const url = `/allBookings?email=${user?.email}`;
  useEffect(() => {
    axiosCustom?.get(url)?.then((res) => {
      setAdminBookings(res.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  const handleDeleteAllBookings = () => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axiosCustom?.delete(`/allBookings?email=${user?.email}`).then((res) => {
          if (res.data?.acknowledged) {
            setAdminBookings([]);
            swal("All Bookings Deleted!", {
              icon: "success",
            });
          }
        });
      } else {
        swal("All Bookings is safe!");
      }
    });
  };

  // if length is 0 or more than one book then
  // show Books/Providers/Bookings plural form. Just a try
  const resultText =
    result?.length === 1 || result?.length === 0 ? "Book" : "Books";
  const uniqueEmailsText =
    uniqueEmails?.length === 1 || uniqueEmails?.length === 0
      ? "Provider"
      : "Providers";
  const adminBookingsText =
    adminBookings?.length === 1 || adminBookings?.length === 0
      ? "Booking"
      : "Bookings";

  return (
    <div>
      {isLoading & user?.email ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#FB0F5A" size={36} />
        </div>
      ) : (
        <>
          <p className="text-center text-lg md:text-2xl my-4 mx-5 md:mx-0">
            Total{" "}
            <Link className="text-green-500" to={"/all-books"}>
              {result?.length}{" "}
            </Link>
            {resultText}, Total {uniqueEmails?.length} Book {uniqueEmailsText}{" "}
            and Total {adminBookings?.length} {adminBookingsText}
          </p>
          <div className="max-w-[1180px] mx-2 lg:mx-auto grid md:grid-cols-3 py-3 text-center border border-green-400 rounded-lg mb-3">
            {uniqueEmails?.map((provider, idx) => (
              <p key={idx}>{provider}</p>
            ))}
          </div>
          {adminBookings.length == 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
              No Booking
            </p>
          ) : (
            <div className="space-y-5">
              {adminBookings?.map((booking) => (
                <AdminBookingCard
                  key={booking._id}
                  getAllBooking={booking}
                  adminBookings={adminBookings}
                  setAdminBookings={setAdminBookings}
                ></AdminBookingCard>
              ))}
              <div className="flex justify-center">
                <button
                  onClick={handleDeleteAllBookings}
                  className="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete all Bookings
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminBooking;
