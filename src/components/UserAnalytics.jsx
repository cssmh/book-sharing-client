import { Chart } from "react-google-charts";
import useAuth from "../Hooks/useAuth";
import ChartSkeleton from "../Components/AllSkeleton/ChartSkeleton";
import useDataQuery from "../Hooks/useDataQuery";

const UserAnalytics = () => {
  const { loading, user } = useAuth();

  const { isLoading, data: UserDashboard } = useDataQuery(
    ["UserDashboard", user?.email],
    `/user-analytics?email=${user?.email}`
  );

  const { isLoading: statLoading, data: monthlyStats } = useDataQuery(
    ["monthlyStats", user?.email],
    `/monthly-stats?email=${user?.email}`
  );

  if (loading || isLoading || statLoading) return <ChartSkeleton user={true} />;

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
    ...monthlyStats.map(({ month, count }) => [month, count]),
  ];

  return (
    <div className="max-w-6xl mx-auto px-1 md:px-5 mt-6">
      <h1 className="text-xl md:text-2xl font-bold mt-3 mx-2 md:mx-0 md:mt-0 mb-1 md:mb-5">
        Hello and Welcome, {user?.displayName}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3 md:my-5">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Your Analytics</h2>
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
      <p className="text-center space-x-4 px-3 md:px-0 mb-8 mt-5 md:mt-0">
        <span className="text-green-400">Books ({myBooks})</span>{" "}
        <span className="text-blue-600">Bookings ({myBookings})</span>{" "}
        <span className="text-violet-600">Progress ({myProgress})</span>{" "}
        <span className="text-red-700">Completed ({myCompleted})</span>
      </p>
    </div>
  );
};

export default UserAnalytics;
