import useAuth from "../Hooks/useAuth";
import { Chart } from "react-google-charts";
import useBookProviders from "../Hooks/useBookProviders";
import useQueryPublic from "../Hooks/useQueryPublic";
import ChartSkeleton from "../Components/AllSkeleton/ChartSkeleton";

const DashHome = () => {
  const { user } = useAuth();
  const admin = user?.email === "admin@admin.com";
  const { providerLoading, bookProviders } = useBookProviders();
  const { isLoading, data: allMonthlyStats } = useQueryPublic(
    ["allMonthlyStats"],
    "/monthly-stats"
  );

  const bookData = [
    ["Users", "Books"],
    ...((bookProviders &&
      bookProviders.map((stat) => [stat?.email, stat?.count])) ||
      []),
  ];

  const bookingData = [
    ["Month", "Books"],
    ...((allMonthlyStats &&
      allMonthlyStats?.map((stat) => [stat?.month, stat?.count])) ||
      []),
  ];

  if (providerLoading || isLoading) return <ChartSkeleton />;

  return (
    <div>
      {admin && (
        <div className="p-5">
          <h1 className="text-2xl font-bold mb-5">Hello and Welcome, Admin</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white p-4 shadow rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Books by Users</h2>
              <Chart
                chartType="PieChart"
                data={bookData}
                options={{
                  pieHole: 0.4,
                }}
                width={"100%"}
                height={"300px"}
              />
            </div>
            <div className="bg-white p-4 shadow rounded-lg">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default DashHome;
