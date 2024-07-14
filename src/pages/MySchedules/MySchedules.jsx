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
    <div>
      <Helmet>
        <title>BookHaven | My-Schedule</title>
      </Helmet>
      <div className="bg-gray-100 flex justify-center gap-2 md:gap-2 mt-4 md:mt-3">
        <button
          onClick={showBooking}
          className={`rounded-xl ${
            activeSchedule === "MyBookings"
              ? "bg-primary text-white"
              : "bg-gray-300"
          } px-4 py-2 rounded text-sm`}
        >
          My Booking
        </button>
        <button
          onClick={showPending}
          className={`rounded-xl ${
            activeSchedule === "MyPending"
              ? "bg-primary text-white"
              : "bg-gray-300"
          } px-4 py-2 rounded text-sm`}
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
