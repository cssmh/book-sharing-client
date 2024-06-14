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

  const { isLoading: loading, data: monthlyStats } = useQuery({
    queryKey: ["monthlyStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/monthly-stats?email=${user?.email}`
      );
      return res?.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading || loading) return <SmallLoader />;

  if (!userAnalytics || !monthlyStats) {
    return <p className="text-red-400 text-center my-6">Error fetching data</p>;
  }

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

  const bookData = [
    ["Month", "Books"],
    ...monthlyStats.map((stat) => [stat?.month, stat?.count]),
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-14 mb-6">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3">User Analytics</h2>
          <Chart
            chartType="PieChart"
            data={data}
            width={"100%"}
            height={"300px"}
          />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Books by Month</h2>
          {monthlyStats.length > 0 ? (
            <Chart
              chartType="ColumnChart"
              data={bookData}
              options={{
                hAxis: { title: "Month" },
                vAxis: { title: "Books", format: "0" },
                legend: "none",
              }}
              width={"100%"}
              height={"300px"}
            />
          ) : (
            <p>You have no added books!</p>
          )}
        </div>
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
