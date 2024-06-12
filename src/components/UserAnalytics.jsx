import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SmallLoader from "./AllLoader/SmallLoader";

const UserAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { isLoading, data: userAnalytics } = useQuery({
    queryKey: ["userAnalytics", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-analytics?email=${user?.email}`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <SmallLoader />;

  const {
    totalBooks,
    myBooks,
    totalBooking,
    myBookings,
    myProgress,
    myCompleted,
  } = userAnalytics;

  const data = [
    ["Task", "Percentage"],
    ["Added Books", (myBooks / totalBooks) * 100],
    ["Total Bookings", (myBookings / totalBooking) * 100],
    ["Progress Bookings", (myProgress / myBookings) * 100],
    ["Completed Bookings", (myCompleted / myBookings) * 100],
    ["Average Booking", (myBookings / totalBooking) * 100],
  ];

  const options = {
    title: "User Analytics",
  };

  return (
    <div>
      <div className="md:min-h-[63vh]">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      </div>
      <p className="text-center space-x-4 px-3 md:px-0">
        <span className="text-green-400">Books ({myBooks})</span>{" "}
        <span className="text-blue-600">Bookings ({myBookings})</span>{" "}
        <span className="text-violet-600">Progress ({myProgress})</span>{" "}
        <span className="text-red-700">Completed ({myCompleted})</span>
      </p>
    </div>
  );
};

export default UserAnalytics;
