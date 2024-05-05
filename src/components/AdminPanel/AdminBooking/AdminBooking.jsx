import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import AdminBookingCard from "../AdminBookingCard/AdminBookingCard";
import MakeBookingsPending from "../MakeBookingsPending/MakeBookingsPending";
import useTotalProviderHook from "../../../useCustomHook/useTotalProviderHook";
import MakeBooksAvailable from "../MakeBooksAvailable/MakeBooksAvailable";
import DeleteAllBookings from "../DeleteAllBookings/DeleteAllBookings";

const AdminBooking = () => {
  const [result, setResult] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [filterAdminBookings, setFilterAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");
  const { axiosSecure, axiosNoToken } = useAxiosHook();
  const { uniqueEmails, booksByProvider } = useTotalProviderHook();

  const providerArray = Object.entries(booksByProvider).map(
    ([email, count]) => ({
      email,
      count,
    })
  );

  useEffect(() => {
    axiosNoToken.get("/all-books").then((res) => setResult(res.data?.result));
  }, [axiosNoToken]);

  useEffect(() => {
    axiosSecure.get("all-bookings")?.then((res) => {
      setAdminBookings(res?.data);
      setFilterAdminBookings(res?.data);
      setIsLoading(false);
    });
  }, [axiosSecure]);

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

  // filter type
  const handleFilter = (e) => {
    const filterType = e.target.value;
    setFilterType(filterType);
    if (filterType === "All") {
      setFilterAdminBookings(adminBookings);
    } else {
      const filterNow = adminBookings.filter(
        (allType) => allType.status === filterType
      );
      setFilterAdminBookings(filterNow);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div>
        {isLoading ? (
          <div className="flex justify-center mt-5">
            <HashLoader color="#00CC66" size={32} />
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
              {providerArray?.map((provider, idx) => (
                <p key={idx}>
                  {provider.email}:{" "}
                  <Link
                    className="text-green-500"
                    to={`/provider/${provider.email}`}
                  >
                    {provider.count}
                  </Link>
                </p>
              ))}
            </div>
            {adminBookings.length === 0 ? (
              <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
                No Booking
              </p>
            ) : (
              <div className="max-w-[1180px] mx-2 lg:mx-auto">
                <div className="flex flex-col md:flex-row justify-end items-center gap-[5px] mb-3">
                  <p className="border border-green-500 px-3 py-[6px] rounded-md">
                    Button use Restriction!
                  </p>
                  <p className="bg-green-500 px-3 py-[6px] rounded-md text-white">
                    Hello Admin
                  </p>
                  <DeleteAllBookings
                    setAdminBookings={setAdminBookings}
                  ></DeleteAllBookings>
                  <MakeBookingsPending></MakeBookingsPending>
                  <MakeBooksAvailable></MakeBooksAvailable>
                  <select
                    className="input text-sm px-3 border-green-500 rounded-2xl focus:border-transparent"
                    style={{ outline: "none", height: "38px" }}
                    defaultValue="All"
                    onChange={(e) => handleFilter(e)}
                  >
                    <option value="All">All</option>
                    <option value="Pending">Pending</option>
                    <option value="Progress">Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                {filterAdminBookings.length === 0 ? (
                  <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
                    No {filterType} Booking!
                  </p>
                ) : (
                  <div className="space-y-5">
                    {filterAdminBookings?.map((booking) => (
                      <AdminBookingCard
                        key={booking._id}
                        getAllBooking={booking}
                        adminBookings={adminBookings}
                        setAdminBookings={setAdminBookings}
                        filterAdminBookings={filterAdminBookings}
                        setFilterAdminBookings={setFilterAdminBookings}
                      ></AdminBookingCard>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminBooking;
