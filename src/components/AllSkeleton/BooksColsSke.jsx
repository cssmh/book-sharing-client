const BooksColsSke = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table max-w-7xl mx-auto">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4 text-left text-sm">Book Image</th>
            <th className="py-2 px-4 text-left text-sm">Book Name</th>
            <th className="py-2 px-4 text-left text-sm">Provider Name</th>
            <th className="py-2 px-4 text-left text-sm">Location</th>
            <th className="py-2 px-4 text-left text-sm">Status</th>
            <th className="py-2 px-4 text-left text-sm">Details</th>
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
