import { useState } from "react";
import UpdateUserModal from "../Components/Modal/UpdateUserModal";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (role) => {
    axiosSecure
      .patch(`/user-update/${user?.email}`, { role })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success(`Updated to ${role}`);
          refetch();
        }
      })
      .catch((err) => console.log(err));
    setIsOpen(false);
  };

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user?.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user?.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user?.timestamp).toLocaleDateString()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            user.role === "guest"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-600"
          }`}
        >
          {user?.role.toUpperCase() || "Unavailable"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-3 py-1.5 text-base font-medium rounded-md text-white bg-green-600 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
>
          Update Role
        </button>
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleModal={handleModal}
          user={user}
        />
      </td>
    </tr>
  );
};

export default UserDataRow;
