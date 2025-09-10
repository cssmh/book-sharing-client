import swal from "sweetalert";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { updateRole } from "../Api/auth";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useDataQuery from "../Hooks/useDataQuery";
import { deleteUser } from "../Api/delete";
import { FaTrashAlt } from "react-icons/fa";

const UserDataRow = ({ user, refetch }) => {
  const { loading, user: userAuth } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user?.role);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const {
    data = {},
    isLoading,
    refetch: refetchTotalAdmin,
  } = useDataQuery(["totalAdmin"], "/total-admin");

  const totalAdmin = data.totalAdmin || 0;

  const handleRoleUpdate = async () => {
    if (
      userAuth?.email === user?.email &&
      selectedRole === "guest" &&
      totalAdmin <= 1
    ) {
      toast.error(
        "You cannot downgrade your own role to 'guest' as you are the only admin."
      );
      setIsModalOpen(false);
      return;
    }

    try {
      const res = await updateRole(user?.email, selectedRole);
      if (res?.modifiedCount > 0) {
        toast.success(`Updated to ${selectedRole}`);
        refetch();
        refetchTotalAdmin();
        if (userAuth?.email === user?.email && selectedRole === "guest") {
          navigate("/");
        }
      }
    } catch (error) {
      swal(error?.response?.data?.message, {
        icon: "error",
        timer: 3000,
      });
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id, role) => {
    if (role === "admin") {
      swal({
        title: "Action not allowed!",
        text: "Downgrade to a regular user before deletion.",
        icon: "warning",
        timer: 2000,
      });
      return;
    }

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
      } catch (error) {
        swal(error?.response?.data?.message, {
          icon: "error",
          timer: 3000,
        });
      }
    }
  };

  const openRoleModal = () => {
    setIsModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  if (loading || isLoading) {
    return (
      <tr>
        <td colSpan="6" className="py-4 text-center">
          <div className="w-full h-16 bg-gray-200 animate-pulse rounded-lg"></div>
        </td>
      </tr>
    );
  }

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors duration-200">
        <td className="py-4 whitespace-nowrap text-sm px-5">
          <div className="flex items-center gap-2">
            <img
              src={user?.photo}
              className="w-9 h-9 rounded-full object-cover"
              alt={user?.name}
            />
            <span className="font-semibold text-gray-700">{user?.name}</span>
          </div>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {user?.email}
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-700">
          <div className="flex flex-col space-y-1">
            <p className="text-green-500">
              <span className="font-medium">Created:</span>{" "}
              {new Date(parseInt(user?.timestamp[0], 10)).toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </p>
            <p>
              <span className="font-medium">Last Login:</span>{" "}
              {new Date(parseInt(user?.timestamp[1], 10)).toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}
            </p>
          </div>
        </td>
        <td className="px-7 py-4 whitespace-nowrap text-sm">
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
              user?.role === "guest"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user?.role?.toUpperCase() || "Unavailable"}
          </span>
        </td>
        <td className="pr-2 text-center py-4 whitespace-nowrap">
          <button
            onClick={() => handleDelete(user._id, user?.role)}
            className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
          >
            <FaTrashAlt className="w-5 h-5" />
          </button>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-right">
          <button
            onClick={openRoleModal}
            className="px-4 py-2 text-sm font-semibold rounded-full text-white bg-green-500 hover:bg-green-600 transition-colors duration-200"
          >
            Update Role
          </button>
        </td>
      </tr>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
          onClick={handleClickOutside}
        >
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Select Role</h2>
            <div className="flex flex-col space-y-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={selectedRole === "admin"}
                  onChange={() => setSelectedRole("admin")}
                  className="form-radio text-green-500 w-4 h-4"
                />
                <span className="text-gray-700 font-medium">Admin</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="guest"
                  checked={selectedRole === "guest"}
                  onChange={() => setSelectedRole("guest")}
                  className="form-radio text-green-500 w-4 h-4"
                />
                <span className="text-gray-700 font-medium">Guest</span>
              </label>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleRoleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-300"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDataRow;
