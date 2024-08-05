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
      <div className="flex justify-center gap-2 md:gap-2 mt-[18px]">
        <button
          onClick={showBooking}
          className={`rounded-3xl ${
            activeSchedule === "MyBookings"
              ? "bg-primary text-white"
              : "bg-gray-300"
          } px-[18px] py-[10px] text-sm`}
        >
          My Booking
        </button>
        <button
          onClick={showPending}
          className={`rounded-3xl ${
            activeSchedule === "MyPending"
              ? "bg-primary text-white"
              : "bg-gray-300"
          } px-[18px] py-[10px] text-sm`}
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
