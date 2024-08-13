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
      <div className="flex justify-center gap-2 md:gap-2 mt-5">
        <button
          onClick={showBooking}
          className={`rounded-3xl ${
            activeSchedule === "MyBookings" && "text-green-500"
          } font-semibold bg-gray-100 px-7 md:px-14 py-[10px] text-[15px]`}
        >
          My Booking
        </button>
        <button
          onClick={showPending}
          className={`rounded-3xl ${
            activeSchedule === "MyPending" && "text-green-500"
          } font-semibold bg-gray-100 px-7 md:px-14 py-[10px] text-[15px]`}
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
