import swal from "sweetalert";
import toast from "react-hot-toast";
import { useState } from "react";
import { updateRole } from "../Api/auth";
import useAuth from "../Hooks/useAuth";
import UpdateUserModal from "../Components/Modal/UpdateUserModal";
import { useNavigate } from "react-router-dom";
import useDataQuery from "../Hooks/useDataQuery";
import { deleteUser } from "../Api/delete";
import { FaTrashAlt } from "react-icons/fa";

const UserDataRow = ({ user, refetch }) => {
  const { loading, user: userAuth } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data = 0,
    isLoading,
    refetch: totalAdRefetch,
  } = useDataQuery(["totalAdmin"], "/total-admin");
  const totalAdmin = data?.totalAdmin || 0;

  const handleModal = async (role) => {
    const msg =
      "You cannot downgrade your own role to 'guest' as you are the only admin.";

    if (
      userAuth?.email === user?.email &&
      role === "guest" &&
      totalAdmin <= 1
    ) {
      toast.error(msg);
      setIsOpen(false);
      return;
    }

    try {
      const res = await updateRole(user?.email, role);
      if (res?.modifiedCount > 0) {
        swal(`Updated to ${role}`, {
          icon: "success",
          timer: 2000,
        });
        refetch();
        totalAdRefetch();
        if (userAuth?.email === user?.email && role === "guest") {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsOpen(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (confirmDelete) {
      try {
        const res = await deleteUser(id);
        if (res?.deletedCount > 0) {
          swal("Deleted!", {
            icon: "success",
            timer: 2000,
          });
          refetch();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (loading || isLoading)
    return (
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
          <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        </td>
      </tr>
    );

  return (
    <tr>
      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {user?.email}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user?.name}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(user?.timestamp).toLocaleDateString("en-GB")}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
            user.role === "guest"
              ? "bg-green-100 text-green-500"
              : "bg-orange-100 text-red-600"
          }`}
        >
          {user?.role.toUpperCase() || "Unavailable"}
        </span>
      </td>
      <td className="pr-4 text-center py-4 whitespace-nowrap text-gray-500">
        <button
          onClick={() => handleDelete(user._id)}
          className="inline-flex items-center px-2 py-1 text-red-500 hover:text-red-700 transition-colors duration-200"
        >
          <FaTrashAlt />
        </button>
      </td>
      <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-2 py-1 text-base font-medium rounded-lg text-white bg-green-500 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
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
