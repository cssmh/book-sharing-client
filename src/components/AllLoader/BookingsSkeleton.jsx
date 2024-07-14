const BookingsSkeleton = () => {
  const skeletonClass = "h-6 bg-gray-300 rounded-md animate-pulse mx-auto";
  const smallSkeletonClass = "h-5 bg-gray-300 rounded-md animate-pulse mx-auto";
  const imageClass =
    "rounded-xl w-[120px] md:w-[130px] mx-auto mb-1 bg-gray-300 h-32 animate-pulse";

  return (
    <div className="flex flex-col md:flex-row justify-center items-center border border-green-500 p-4 rounded-lg">
      <div className="flex-1 text-center">
        <div className={imageClass}></div>
        <div className={`${skeletonClass} w-3/4 mt-2`}></div>
        <div className={`${smallSkeletonClass} w-1/2 mt-1`}></div>
        <div className={`${smallSkeletonClass} w-1/3 mb-2 md:mb-0 mt-1`}></div>
      </div>
      <div className="flex-1 text-center md:text-lg border-t-2 md:border-t-0 pt-2 md:pt-0 text-lg">
        <div className={`${skeletonClass} w-2/3 mb-1`}></div>
        <div className={`${skeletonClass} w-1/2 mb-1`}></div>
        <div className={`${smallSkeletonClass} w-3/4 mb-1`}></div>
        <div className={`${smallSkeletonClass} w-1/2 mb-1`}></div>
        <div className={`${smallSkeletonClass} w-1/3 mb-1`}></div>
        <button
          className={`text-white bg-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center mx-2 md:mx-0 animate-pulse w-40`}
        >
        </button>
      </div>
    </div>
  );
};

export default BookingsSkeleton;
