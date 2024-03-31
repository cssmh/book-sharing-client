import { useState } from "react";
import MyBookings from "./MyBookings";
import MyPending from "./MyPending";
import { Helmet } from "react-helmet-async";

const MySchedules = () => {
  const [activeComponent, setActiveComponent] = useState("MyBookings");

  const showBook = () => {
    setActiveComponent("MyBookings");
  };
  const showPending = () => {
    setActiveComponent("MyPending");
  };
  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Schedule</title>
      </Helmet>
      <div className="flex justify-center gap-4 mt-6 mb-4">
        <button
          onClick={showBook}
          className={
            activeComponent === "MyBookings"
              ? "btn btn-primary text-white"
              : "btn"
          }
        >
          My Booking
        </button>
        <button
          onClick={showPending}
          className={
            activeComponent === "MyPending"
              ? "btn btn-primary text-white"
              : "btn"
          }
        >
          My Pending
        </button>
      </div>
      {activeComponent === "MyBookings" && <MyBookings></MyBookings>}
      {activeComponent === "MyPending" && <MyPending></MyPending>}
    </div>
  );
};

export default MySchedules;
