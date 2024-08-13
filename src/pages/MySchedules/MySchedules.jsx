import { useState } from "react";
import { Helmet } from "react-helmet-async";
import MyBookings from "../MyBookings/MyBookings";
import MyPending from "../MyPending/MyPending";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const MySchedules = () => {
  const [activeSchedule, setActiveSchedule] = useState("MyBookings");

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>BookHaven | My Schedule</title>
      </Helmet>
      <header className="bg-gray-800 text-white px-7 py-4 flex flex-col md:flex-row justify-between items-center relative">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">My Schedules</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setActiveSchedule("MyBookings")}
            className={`py-1.5 px-3 rounded-lg text-md font-medium flex items-center transition-colors ${
              activeSchedule === "MyBookings"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <FaCalendarAlt className="mr-2" />
            My Bookings
          </button>
          <button
            onClick={() => setActiveSchedule("MyPending")}
            className={`py-1.5 px-3 rounded-lg text-md font-medium flex items-center transition-colors ${
              activeSchedule === "MyPending"
                ? "bg-green-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <FaClock className="mr-2" />
            My Pending
          </button>
        </div>
      </header>
      <main className="flex-1 bg-white pb-1">
        {activeSchedule === "MyBookings" ? <MyBookings /> : <MyPending />}
      </main>
    </div>
  );
};

export default MySchedules;
