import { useState } from "react";
import MyBookings from "./MyBookings";
import MyPending from "./MyPending";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import HavenHelmet from "../Components/HavenHelmet";

const MySchedules = () => {
  const [activeSchedule, setActiveSchedule] = useState("MyBookings");

  return (
    <div className="flex flex-col min-h-screen">
      <HavenHelmet title="My Schedule" />
      <header className="bg-gray-800 text-white md:px-7 py-[15px] flex flex-col md:flex-row justify-between items-center relative">
        <h1 className="text-[21px] font-semibold mb-2 md:mb-0">My Schedules</h1>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setActiveSchedule("MyBookings")}
            className={`py-1.5 px-3 rounded-2xl text-md font-medium flex items-center transition-colors ${
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
            className={`py-1.5 px-3 rounded-2xl text-md font-medium flex items-center transition-colors ${
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
