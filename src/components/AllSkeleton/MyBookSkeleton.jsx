const MyBookSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl flex flex-col items-center text-center space-y-2 mb-5 animate-pulse">
      <div className="flex-grow">
        <div className="pt-4 mb-2">
          <div className="bg-gray-200 rounded-xl w-[100px] h-[130px]"></div>
        </div>
        <div className="bg-gray-200 h-6 w-3/4 rounded mx-auto mb-2"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded mx-auto mb-1"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded mx-auto mb-1"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded mx-auto mb-1"></div>
      </div>
      <div className="pb-5">
        <div className="space-x-1">
          <div className="bg-gray-200 h-8 w-24 rounded mx-auto mb-2"></div>
          <div className="bg-gray-200 h-8 w-24 rounded mx-auto mb-2"></div>
          <div className="bg-gray-200 h-8 w-24 rounded mx-auto mb-2"></div>
        </div>
      </div>
    </div>
  );
};

export default MyBookSkeleton;
