import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MyBookings from "../MyBookings/MyBookings";
import MyPending from "../MyPending/MyPending";

const MySchedules = () => {
  const [activeSchedule, setActiveSchedule] = useState("MyBookings");

  const showBooking = () => {
    setActiveSchedule("MyBookings");
  };

  const showPending = () => {
    setActiveSchedule("MyPending");
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <Helmet>
        <title>BookHaven | My-Schedule</title>
      </Helmet>
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={showBooking}
          className={`flex-1 text-center rounded-lg py-2 px-4 text-lg font-semibold transition-colors ${
            activeSchedule === "MyBookings"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          My Bookings
        </button>
        <button
          onClick={showPending}
          className={`flex-1 text-center rounded-lg py-2 px-4 text-lg font-semibold transition-colors ${
            activeSchedule === "MyPending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          My Pending
        </button>
      </div>
      {activeSchedule === "MyBookings" && <MyBookings />}
      {activeSchedule === "MyPending" && <MyPending />}
    </div>
  );
};

export default MySchedules;
