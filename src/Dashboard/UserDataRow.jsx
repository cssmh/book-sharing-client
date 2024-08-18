import { useState } from "react";
import UpdateUserModal from "../Components/Modal/UpdateUserModal";
import toast from "react-hot-toast";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const UserDataRow = ({ user, refetch }) => {
  const { loading, user: userAuth } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    data: totalAdmin = 0,
    isLoading,
    refetch: totalAdRefetch,
  } = useQuery({
    queryKey: ["totalAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/total-admin");
      return res?.data?.totalAdmin || 0;
    },
  });

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
      const res = await axiosSecure.patch(`/user-update/${user?.email}`, {
        role,
      });
      if (res?.data?.modifiedCount > 0) {
        swal(`updated to ${role}`, {
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
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div className="w-32 h-6 bg-gray-200 animate-pulse rounded"></div>
        </td>
      </tr>
    );

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
              : "bg-orange-100 text-red-600"
          }`}
        >
          {user?.role.toUpperCase() || "Unavailable"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center px-2.5 py-1.5 text-base font-medium rounded-lg text-white bg-green-600 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
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
