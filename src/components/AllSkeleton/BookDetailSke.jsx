const BookDetailSke = () => {
  return (
    <div className="animate-pulse">
      <div className="card max-w-xl mx-auto shadow-xl p-6 mt-2 md:mt-4">
        <h2 className="text-center font-bold text-xl md:text-[22px] text-blue-800 italic bg-gray-300 h-8 rounded"></h2>
        <figure className="flex justify-center my-2">
          <div className="rounded-full w-24 h-24 bg-gray-300"></div>
        </figure>
        <div className="text-center text-lg">
          <h3 className="text-orange-500 font-bold bg-gray-300 h-2 rounded"></h3>
          <p className="text-gray-700 bg-gray-300 h-3 rounded"></p>
          <p className="text-green-500 bg-gray-300 h-3 rounded"></p>
          <p className="text-lg font-medium">
            <span className="text-blue-500 bg-gray-300 h-4 rounded"></span>
          </p>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-sm rounded-full btn-success text-white bg-gray-300 h-8 w-40"></button>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-7 py-8">
        <div className="flex-1">
          <div className="rounded-xl w-[140px] lg:w-[250px] mx-auto lg:mx-0 lg:ml-auto bg-gray-300 h-[150px] md:h-[250px]"></div>
        </div>
        <div className="flex-1 space-y-1 text-center lg:text-left">
          <h2 className="text-[21px] font-bold text-blue-900 bg-gray-300 h-5 rounded md:w-1/2"></h2>
          <p className="font-semibold bg-gray-300 h-4 rounded md:w-1/2"></p>
          <p className="bg-gray-300 h-4 rounded md:w-1/2"></p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-8">
        <div className="flex gap-1">
          <button className="px-3 py-2 text-white rounded-md mb-2 bg-gray-300 h-10 w-32"></button>
          <button className="px-3 py-2 text-white rounded-md mb-2 h-10 w-32"></button>
        </div>
        <p className="bg-gray-300 h-6 rounded"></p>
      </div>
    </div>
  );
};

export default BookDetailSke;
