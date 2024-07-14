const BooksColsSke = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table max-w-7xl mx-auto">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="bg-yellow-400 text-white rounded-tl-md py-2 px-4">
              Book Image
            </th>
            <th className="bg-yellow-400 text-white py-2 px-4">Book Name</th>
            <th className="bg-yellow-400 text-white py-2 px-4">
              Provider Name
            </th>
            <th className="bg-yellow-400 text-white py-2 px-4">Location</th>
            <th className="bg-yellow-400 text-white py-2 px-4">Status</th>
            <th className="bg-yellow-400 text-white rounded-tr-md py-2 px-4">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="animate-pulse">
            <td className="py-2 px-4">
              <div className="h-16 w-16 bg-gray-300 rounded-md"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-6 bg-gray-300 rounded-md"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-6 bg-gray-300 rounded-md"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-6 bg-gray-300 rounded-md"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-6 bg-gray-300 rounded-md"></div>
            </td>
            <td className="py-2 px-4">
              <div className="h-6 bg-gray-300 rounded-md"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BooksColsSke;
