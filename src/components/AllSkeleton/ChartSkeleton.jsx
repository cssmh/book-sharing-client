const ChartSkeleton = ({ user }) => {
  return (
    <div
      className={`mx-2 ${user && "container 2xl:max-w-[1370px] mx-auto"} mt-7`}
    >
      <h1 className="text-2xl font-bold mb-5 animate-pulse bg-gray-200 rounded h-8 w-3/4"></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:my-5">
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3 animate-pulse bg-gray-200 rounded h-6 w-1/2"></h2>
          <div className="bg-gray-200 rounded-lg h-64 w-full animate-pulse"></div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-3 animate-pulse bg-gray-200 rounded h-6 w-1/2"></h2>
          <div className="bg-gray-200 rounded-lg h-64 w-full animate-pulse"></div>
        </div>
      </div>
      <p className="text-center px-3 md:px-0 mb-8">
        <span className="animate-pulse bg-gray-200 rounded h-6 w-1/4"></span>{" "}
        <span className="animate-pulse bg-gray-200 rounded h-6 w-1/4"></span>{" "}
        <span className="animate-pulse bg-gray-200 rounded h-6 w-1/4"></span>{" "}
        <span className="animate-pulse bg-gray-200 rounded h-6 w-1/4"></span>
      </p>
    </div>
  );
};

export default ChartSkeleton;
