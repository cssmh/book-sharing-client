import { useEffect, useState } from "react";
import { FiWifi, FiWifiOff } from "react-icons/fi";

const Internet = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);
    };

    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    showMessage && (
      <div className="z-10 fixed -bottom-1 left-0 p-3">
        {isOnline ? (
          <p className="flex items-center gap-1 text-green-400">
            <FiWifi />
            Your internet connection is restored!
          </p>
        ) : (
          <p className="flex items-center gap-1 text-red-600">
            <FiWifiOff />
            You lost the internet connection
          </p>
        )}
      </div>
    )
  );
};

export default Internet;
