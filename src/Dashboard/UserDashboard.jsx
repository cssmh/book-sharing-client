import { useQuery } from "@tanstack/react-query";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import SmallLoader from "../Components/AllLoader/SmallLoader";

const UserDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { loading, user } = useAuth();
  const admin = user?.email === "admin@admin.com";

  const { isLoading, data: UserDashboard } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["UserDashboard", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-analytics?email=${user?.email}`);
      return res?.data;
    },
  });

  const { isLoading: statLoading, data: monthlyStats } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["monthlyStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/monthly-stats?email=${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading || statLoading) return <SmallLoader />;

  if (!UserDashboard || !monthlyStats) {
    return <p className="text-red-400 text-center my-6">Error fetching data</p>;
  }

  const {
    totalBooks,
    myBooks,
    totalBooking,
    myBookings,
    myProgress,
    myCompleted,
  } = UserDashboard;

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
    <div className="max-w-6xl mx-auto p-5">
      {!admin && (
        <h1 className="text-2xl font-bold mb-5">
          Hello and Welcome, {user?.displayName}
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:my-5">
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
      <p className="text-center space-x-4 px-3 md:px-0 mb-8">
        <span className="text-green-400">Books ({myBooks})</span>{" "}
        <span className="text-blue-600">Bookings ({myBookings})</span>{" "}
        <span className="text-violet-600">Progress ({myProgress})</span>{" "}
        <span className="text-red-700">Completed ({myCompleted})</span>
      </p>
    </div>
  );
};

export default UserDashboard;
