const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl py-6 group mx-2 md:mx-0">
      <figure className="animate-pulse">
        <div className="bg-gray-300 rounded-xl w-[20%] md:w-[25%] h-38"></div>
      </figure>
      <div className="group-hover:scale-105 group-hover:transition-all group-hover:duration-300 card-body items-center text-center p-0 px-3 gap-[0px]">
        <h2 className="bg-gray-300 h-6 w-3/4 md:w-1/2 mx-auto rounded-md mt-2"></h2>
        <p className="bg-gray-300 h-4 w-5/6 mx-auto rounded-md mb-1"></p>
        <div className="flex items-center gap-3 mb-3 border border-red-400 rounded-full px-12 py-2 bg-red-100 shadow-md animate-pulse mt-2">
          <div className="avatar">
            <div className="w-12 h-12 bg-gray-300 rounded-full ring ring-primary mr-10"></div>
          </div>
          <h2 className="bg-gray-300 h-6 w-1/4 rounded-md"></h2>
        </div>
        <p className="bg-gray-300 h-4 w-2/3 mx-auto rounded-md text-green-500 font-semibold"></p>
        <p className="bg-gray-300 h-4 w-3/4 mx-auto rounded-md text-gray-500"></p>
        <div className="card-actions mt-2">
          <button className="btn border-green-400 bg-yellow-50 text-green-400 hover:bg-green-400 hover:text-white animate-pulse">
            <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
