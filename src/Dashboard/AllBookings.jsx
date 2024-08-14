import { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import AllBookingsCard from "./AllBookingsCard";
import { useQuery } from "@tanstack/react-query";
import DeleteAllBookings from "./DeleteAllBookings";
import { Helmet } from "react-helmet-async";
import { ScaleLoader } from "react-spinners";

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
      <Helmet>
        <title>BookHaven | All Bookings</title>
      </Helmet>
      <h1 className="text-center font-semibold text-xl mb-3 mt-2 md:mt-0">
        {filterType} Bookings ({allBookings.length})
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center gap-[5px] mb-2">
        <DeleteAllBookings refetch={refetch}></DeleteAllBookings>
        <select
          className="input text-sm px-3 border-green-500 rounded-xl focus:border-transparent"
          style={{ outline: "none", height: "36px" }}
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
        <div className="h-[72vh] flex justify-center items-center">
          <ScaleLoader size={100} color="red" />
        </div>
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
