import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DeleteAllBookings from "../DeleteAllBookings/DeleteAllBookings";
import MakeBookingsPending from "../MakeBookingsPending/MakeBookingsPending";
import MakeBooksAvailable from "../MakeBooksAvailable/MakeBooksAvailable";
import AllBookingsCard from "../AllBookingsCard/AllBookingsCard";
import { useQuery } from "@tanstack/react-query";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [allBookings, setAllBookings] = useState([]);
  const [filterAllBookings, setFilterAllBookings] = useState([]);
  const [filterType, setFilterType] = useState("All");

  const {
    data: allBookingsData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookingsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-bookings");
      return res?.data;
    },
    enabled: true,
    // query will run immediately when the component mounts
  });

  useEffect(() => {
    setAllBookings(allBookingsData);
    setFilterAllBookings(allBookingsData);
  }, [allBookingsData]);

  // filter type
  const handleFilter = (e) => {
    const filterType = e.target.value;
    setFilterType(filterType);
    if (filterType === "All") {
      setFilterAllBookings(allBookings);
    } else {
      const filterNow = allBookings.filter(
        (allType) => allType.status === filterType
      );
      setFilterAllBookings(filterNow);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#00CC66" size={32} />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center text-xl mb-5">All Bookings</h1>
      <div className="flex flex-col md:flex-row justify-end items-center gap-[5px] mb-3">
        <p className="border border-green-500 px-3 py-[6px] rounded-md">
          Hello BookHaven Admin
        </p>
        <DeleteAllBookings refetch={refetch}></DeleteAllBookings>
        <MakeBookingsPending refetch={refetch}></MakeBookingsPending>
        <MakeBooksAvailable></MakeBooksAvailable>
        <select
          className="input text-sm px-3 border-green-500 rounded-xl focus:border-transparent"
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
      {allBookings.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
          No Booking
        </p>
      ) : (
        <div className="max-w-[1180px] mx-2 lg:mx-auto">
          {filterAllBookings.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
              No {filterType} Booking!
            </p>
          ) : (
            <div className="space-y-3">
              {filterAllBookings?.map((booking, index) => (
                <AllBookingsCard
                  key={booking._id}
                  getIndex={index + 1}
                  getAllBooking={booking}
                  refetch={refetch}
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
