import UserDataRow from "./UserDataRow";
import SmallLoader from "../Components/SmallLoader";
import useDataQuery from "../Hooks/useDataQuery";
import HavenHelmet from "../Components/HavenHelmet";

const AllUsers = () => {
  const {
    data = [],
    isLoading,
    refetch,
  } = useDataQuery(["allUsers"], "/users");

  if (isLoading) return <SmallLoader size={84} />;

  return (
    <div className="bg-white shadow-lg rounded-xl px-6 py-6">
      <HavenHelmet title="All Users" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        All Users ({data?.length})
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Name
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Created & Last Login
              </th>
              <th className="px-7 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Role
              </th>
              <th className="px-7 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                Delete
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
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
