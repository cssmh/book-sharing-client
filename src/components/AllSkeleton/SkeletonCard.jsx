const SkeletonCard = () => {
  return (
    <div className="card bg-base-100 shadow-lg py-6 rounded-xl animate-pulse">
      <figure>
        <div className="bg-gray-300 rounded-lg w-28 h-36 mx-auto"></div>
      </figure>
      <div className="card-body items-center text-center p-4">
        <h2 className="bg-gray-300 h-6 w-3/4 rounded-md mt-2"></h2>
        <p className="bg-gray-300 h-4 w-5/6 mx-auto rounded-md mt-2"></p>

        <div className="flex items-center gap-3 border border-red-400 rounded-full px-4 py-2 bg-red-100 mt-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full ring ring-primary"></div>
          <h2 className="bg-gray-300 h-5 w-20 rounded-md"></h2>
        </div>

        <p className="bg-gray-300 h-4 w-2/3 mx-auto rounded-md mt-3"></p>
        <p className="bg-gray-300 h-4 w-3/4 mx-auto rounded-md mt-2"></p>

        <button className="btn border-green-400 bg-yellow-50 text-green-400 hover:bg-green-400 hover:text-white mt-4">
          <div className="h-4 w-28 bg-gray-300 rounded-md"></div>
        </button>
      </div>
    </div>
  );
};

export default SkeletonCard;
