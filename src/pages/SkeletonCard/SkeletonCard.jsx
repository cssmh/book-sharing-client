const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl py-4 md:hover:scale-105 transition-all duration-300 animate-pulse mx-2 lg:mx-0">
      <div>
        <figure>
          <div className="bg-gray-200 rounded-xl w-[46%] h-48"></div>
        </figure>
      </div>
      <div className="card-body items-center text-center p-0 px-3 gap-1">
        <h2 className="text-[24px] font-bold text-blue-900 mt-2 bg-gray-200 h-6 w-3/4"></h2>
        <p className="px-2 bg-gray-200 h-4 w-full"></p>
        <div className="flex justify-center items-center gap-3 my-1 border-2 border-red-400 rounded-lg px-3 py-2">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary bg-gray-200"></div>
          </div>
          <h2 className="font-bold text-lg bg-gray-200 h-6 w-24"></h2>
        </div>
        <p className="text-lg text-green-500 bg-gray-200 h-6 w-full"></p>
        <p className="text-lg bg-gray-200 h-6 w-full"></p>
        <div className="card-actions mt-2">
          <button className="btn border-green-400 bg-yellow-50 text-green-400 animate-pulse">
            Loading...
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
