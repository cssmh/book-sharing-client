import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../useCustomHook/useAxiosPublic";
import AllBooksRow from "../AllBooksRow/AllBooksRow";

const AllBooksAdmin = () => {
  const axiosNoToken = useAxiosPublic();
  const { data: allBooks } = useQuery({
    queryKey: ["allBooks"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/all-books");
      return res.data?.result;
    },
  });

  return (
    <div>
      <h1 className="text-center text-xl mb-5">All Books</h1>
      <div className="overflow-x-auto">
        <table className="table max-w-7xl mx-auto">
          <thead>
            <tr>
              <th className="bg-yellow-400 text-white rounded-md">
                Book Image
              </th>
              <th className="bg-yellow-400 text-white rounded-md">Book Name</th>
              <th className="bg-yellow-400 text-white rounded-md">
                Provider Name
              </th>
              <th className="bg-yellow-400 text-white rounded-md">Location</th>
              <th className="bg-yellow-400 text-white rounded-md">Status</th>
              <th className="bg-yellow-400 text-white rounded-md">Details</th>
            </tr>
          </thead>
          <tbody>
            {allBooks?.map((books) => (
              <AllBooksRow key={books._id} getBooks={books}></AllBooksRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooksAdmin;
