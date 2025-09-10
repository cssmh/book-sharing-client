import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  addTimeBooking,
  updateBookingStatus,
  updateBookStatus,
} from "../Api/bookings";
import { motion } from "framer-motion";
import { CiClock2 } from "react-icons/ci";
import { MdCheckCircleOutline } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";

const MyPendingCard = ({ getPending, unavailableIds, refetch, refetchIds }) => {
  const {
    _id,
    book_id,
    book_name,
    book_image,
    provider_email,
    user_email,
    user_phone,
    user_date,
    user_message,
    user_location,
    status,
    completed_at,
  } = getPending;

  const [todayDateTime, setTodayDateTime] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    setIsUpdating(true);
    const bookStatus = newStatus === "Completed" ? "Unavailable" : "available";

    try {
      const res = await updateBookingStatus(_id, provider_email, newStatus);

      if (res.modifiedCount > 0) {
        setSelectedStatus(newStatus);

        await updateBookStatus(book_id, provider_email, bookStatus);

        if (newStatus === "Completed") {
          await addTimeBooking(_id, provider_email, todayDateTime);
          refetchIds();
        }

        refetch();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;
    const formattedTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const dateTime = `${formattedDate}, ${formattedTime}`;
    setTodayDateTime(dateTime);
  }, []);

  const statusOptions = [
    {
      value: "Pending",
      label: "Pending",
      icon: CiClock2,
      color: "text-yellow-600 bg-yellow-100",
    },
    {
      value: "Progress",
      label: "In Progress",
      icon: CiDeliveryTruck,
      color: "text-blue-600 bg-blue-100",
    },
    {
      value: "Completed",
      label: "Completed",
      icon: MdCheckCircleOutline,
      color: "text-emerald-600 bg-emerald-100",
    },
  ];

  const isDisabled =
    status === "Completed" || unavailableIds?.includes(book_id);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 p-6 transition-all duration-200"
    >
      <div className="flex flex-col space-y-4">
        {/* Book Info */}
        <div className="flex items-center space-x-4">
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="w-16 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2">
              {book_name}
            </h3>
            <p className="text-sm text-gray-600">Requested on {user_date}</p>
          </div>
        </div>

        {/* Collector Info */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 text-sm">
            Collector Information
          </h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>📞 {user_phone}</p>
            <p>📧 {user_email}</p>
            <p>📍 {user_location}</p>
          </div>
        </div>

        {/* Message */}
        {user_message && (
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <h4 className="font-medium text-gray-900 text-sm mb-1">Message</h4>
            <p className="text-sm text-gray-600">{user_message}</p>
          </div>
        )}

        {/* Status and Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                statusOptions.find((opt) => opt.value === selectedStatus)?.color
              }`}
            >
              {selectedStatus}
            </span>
          </div>

          {!isDisabled && (
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleUpdateStatus(option.value)}
                  disabled={isUpdating || selectedStatus === option.value}
                  className={`p-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
                    selectedStatus === option.value
                      ? option.color
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option.icon className="w-3 h-3" />
                  {option.label}
                </motion.button>
              ))}
            </div>
          )}

          {isDisabled && (
            <p className="text-xs text-gray-500 text-center">
              {status === "Completed"
                ? "This booking has been completed"
                : "This book is currently unavailable"}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MyPendingCard;
