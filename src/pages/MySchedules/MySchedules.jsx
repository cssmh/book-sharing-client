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
      <div className="flex justify-center gap-2 md:gap-4 mt-6">
        <button
          onClick={showBooking}
          className={
            activeSchedule === "MyBookings"
              ? "btn btn-primary text-white"
              : "btn"
          }
        >
          My Booking
        </button>
        <button
          onClick={showPending}
          className={
            activeSchedule === "MyPending"
              ? "btn btn-primary text-white"
              : "btn"
          }
        >
          My Pending
        </button>
      </div>
      {activeSchedule === "MyBookings" && <MyBookings></MyBookings>}
      {activeSchedule === "MyPending" && <MyPending></MyPending>}
    </div>
  );
};

export default MySchedules;
