import { Helmet } from "react-helmet-async";
import UserDataRow from "./UserDataRow";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import SmallLoader from "../Components/SmallLoader";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res?.data;
    },
  });

  if (isLoading) return <SmallLoader />;

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-4 py-3">
      <Helmet>
        <title>BookHaven | Manage Users</title>
      </Helmet>
      <h1 className="text-xl font-bold mb-4">All Users ({data?.length})</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-2 text-left text-xs font-medium uppercase tracking-wider">
                User Added
              </th>
              <th className="px-7 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Role
              </th>
              <th className="px-5 py-2 text-center text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((user) => (
              <UserDataRow key={user._id} user={user} refetch={refetch} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
