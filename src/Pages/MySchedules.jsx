import { useState } from "react";
import MyBookings from "./MyBookings";
import MyPending from "./MyPending";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import HavenHelmet from "../Components/HavenHelmet";
import { motion } from "framer-motion";
import { Tab } from "@headlessui/react";

const MySchedules = () => {
  const [activeSchedule, setActiveSchedule] = useState("MyBookings");

  const tabs = [
    { key: "MyBookings", label: "My Bookings", icon: FaCalendarAlt },
    { key: "MyPending", label: "My Pending", icon: FaClock },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HavenHelmet title="My Schedule" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-4 py-6 md:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">My Schedules</h1>

          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-emerald-700/50 p-1 max-w-md">
              {tabs.map((tab) => (
                <Tab
                  key={tab.key}
                  onClick={() => setActiveSchedule(tab.key)}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 focus:outline-none transition-all duration-200 flex items-center justify-center space-x-2 ${
                      selected
                        ? "bg-white text-emerald-700 shadow-lg"
                        : "text-emerald-100 hover:bg-white/[0.12] hover:text-white"
                    }`
                  }
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <motion.div
          key={activeSchedule}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSchedule === "MyBookings" ? <MyBookings /> : <MyPending />}
        </motion.div>
      </main>
    </div>
  );
};

export default MySchedules;
