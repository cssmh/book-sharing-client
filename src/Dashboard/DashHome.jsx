import { Chart } from "react-google-charts";
import useBookProviders from "../Hooks/useBookProviders";
import ChartSkeleton from "../Components/AllSkeleton/ChartSkeleton";
import useDataQuery from "../Hooks/useDataQuery";

const DashHome = () => {
  const { loading, bookProviders } = useBookProviders();
  const { data: allMonthlyStats = [], isLoading } = useDataQuery(
    ["allMonthlyStats"],
    "/monthly-stats"
  );
  const { data: topBookings = [], isLoading: topLoading } = useDataQuery(
    ["topBookings"],
    "/top-bookings"
  );

  if (loading || isLoading || topLoading) return <ChartSkeleton />;

  const bookData = [
    ["Users", "Books"],
    ...(bookProviders?.map((stat) => [stat?.email, Number(stat?.count)]) || []),
  ];

  const bookingData = [
    ["Month", "Books"],
    ...(allMonthlyStats?.map((stat) => [stat?.month, Number(stat?.count)]) ||
      []),
  ];

  const booksOverTimeData = [
    ["Month", "Books"],
    ...(allMonthlyStats?.map((stat) => [stat?.month, Number(stat?.count)]) ||
      []),
  ];

  const topContributorsData = [
    ["User", "Books"],
    ...(bookProviders
      ?.sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((stat) => [stat?.email, Number(stat?.count)]) || []),
  ];

  const topBookedBooks = [
    ["Book", "Bookings"],
    ...(topBookings?.map((booking) => [
      booking?._id || "Unknown Book",
      booking?.count || 0,
    ]) || []),
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Hello and Welcome, Admin 👋
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Books by Users</h2>
          <Chart
            chartType="PieChart"
            data={bookData}
            options={{ pieHole: 0.4 }}
            width={"100%"}
            height={"300px"}
          />
        </div>
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Books by Month</h2>
          <Chart
            chartType="ColumnChart"
            data={bookingData}
            options={{
              hAxis: { title: "Month" },
              vAxis: { title: "Books", format: "0" },
              legend: "none",
            }}
            width={"100%"}
            height={"300px"}
          />
        </div>
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Books Over Time</h2>
          <Chart
            chartType="LineChart"
            data={booksOverTimeData}
            options={{
              hAxis: { title: "Month" },
              vAxis: { title: "Books" },
              curveType: "function",
              legend: { position: "bottom" },
            }}
            width={"100%"}
            height={"300px"}
          />
        </div>
        <div className="bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Top Contributors</h2>
          <Chart
            chartType="Table"
            data={topContributorsData}
            options={{
              showRowNumber: true,
              width: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="lg:col-span-2 bg-white p-6 shadow-md rounded-xl">
          <h2 className="text-lg font-semibold mb-3">Top Booked Books</h2>
          <Chart
            chartType="BarChart"
            data={topBookedBooks}
            options={{
              hAxis: {
                title: "Bookings",
                minValue: 0,
              },
              vAxis: {
                title: "Books",
                slantedText: true,
                slantedTextAngle: 45,
              },
              legend: { position: "none" },
              bar: { groupWidth: "75%" },
            }}
            width={"100%"}
            height={"300px"}
          />
        </div>
      </div>
    </div>
  );
};

export default DashHome;
