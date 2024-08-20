import { Chart } from "react-google-charts";
import useBookProviders from "../Hooks/useBookProviders";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ChartSkeleton from "../Components/AllSkeleton/ChartSkeleton";

const DashHome = () => {
  const axiosSecure = useAxiosSecure();
  const { loading, bookProviders } = useBookProviders();

  const { data: allMonthlyStats = [], isLoading } = useQuery({
    queryKey: ["allMonthlyStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/monthly-stats");
      return res?.data;
    },
  });

  const bookData = [
    ["Users", "Books"],
    ...((bookProviders &&
      bookProviders.map((stat) => [stat?.email, Number(stat?.count)])) ||
      []),
  ];

  const bookingData = [
    ["Month", "Books"],
    ...((allMonthlyStats &&
      allMonthlyStats?.map((stat) => [stat?.month, Number(stat?.count)])) ||
      []),
  ];

  if (loading || isLoading) return <ChartSkeleton />;

  return (
    <div className="p-1 md:p-2">
      <h1 className="text-2xl font-bold mb-5 mx-2 md:mx-0">
        Hello and Welcome, Admin
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
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
  );
};

export default DashHome;
