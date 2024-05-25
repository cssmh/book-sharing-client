import { useEffect, useState } from "react";
import useAxiosSecure from "../../../useCustomHook/useAxiosSecure";
import AllBookingsCard from "../AllBookingsCard/AllBookingsCard";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [adminBookings, setAdminBookings] = useState([]);
  const [filterAdminBookings, setFilterAdminBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    axiosSecure.get("/all-bookings")?.then((res) => {
      setAdminBookings(res?.data);
      setFilterAdminBookings(res?.data);
      setIsLoading(false);
    });
  }, [axiosSecure]);

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
      <h1 className="text-center text-xl mb-5">All Bookings</h1>
      {adminBookings.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
          No Booking
        </p>
      ) : (
        <div className="max-w-[1180px] mx-2 lg:mx-auto">
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
          {filterAdminBookings.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
              No {filterType} Booking!
            </p>
          ) : (
            <div className="space-y-5">
              {filterAdminBookings?.map((booking, index) => (
                <AllBookingsCard
                  key={booking._id}
                  getIndex={index + 1}
                  getAllBooking={booking}
                  adminBookings={adminBookings}
                  setAdminBookings={setAdminBookings}
                  filterAdminBookings={filterAdminBookings}
                  setFilterAdminBookings={setFilterAdminBookings}
                ></AllBookingsCard>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBookings;
