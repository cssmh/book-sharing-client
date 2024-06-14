import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import AllBookingsCard from "./AllBookingsCard";
import { useQuery } from "@tanstack/react-query";
import DeleteAllBookings from "./DeleteAllBookings";
import MakeBookingsPending from "./MakeBookingsPending";
import MakeBooksAvailable from "./MakeBooksAvailable";
import SmallLoader from "../Components/AllLoader/SmallLoader";

const AllBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [filterType, setFilterType] = useState("All");

  const {
    data: allBookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allBookings", filterType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-bookings?filter=${filterType}`);
      return res?.data;
    },
  });

  const handleFilter = (e) => {
    setFilterType(e.target.value);
  };

  return (
    <div>
      <h1 className="text-center text-xl mb-5 mt-2 md:mt-0">
        All Bookings ({allBookings.length})
      </h1>
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
      {isLoading ? (
        <SmallLoader />
      ) : allBookings?.length === 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
          No {filterType !== "All" && filterType} Booking
        </p>
      ) : (
        <div className="max-w-[1180px] mx-2 lg:mx-auto">
          {allBookings?.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-10">
              No {filterType} Booking!
            </p>
          ) : (
            <div className="space-y-3">
              {allBookings?.map((booking, index) => (
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
