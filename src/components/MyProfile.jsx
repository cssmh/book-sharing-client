import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMyBooks from "../Hooks/useMyBooks";
import { FaEdit, FaKey } from "react-icons/fa";
import BGBlue from "../../assets/Notified.jpg";
import EditProfileModal from "./Modal/EditProfileModal";
import ChangePassModal from "./Modal/ChangePassModal";

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, handleUpdateProfile, changePassword } = useAuth();
  const { photoURL, email, displayName, metadata, reloadUserInfo } = user;

  const url = `/my-books?email=${user?.email}`;
  const { bookData } = useMyBooks(url);

  const [newName, setNewName] = useState(displayName);
  const [newPhoto, setNewPhoto] = useState(photoURL);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const photo = form.photo.value || defaultImageUrl;

    if (name === displayName && photo === photoURL) {
      toast.error("You didn't change anything.");
      return;
    }

    const updateMyAllBooksInfo = {
      name,
      photo,
    };

    handleUpdateProfile(name, photo)
      .then(() => {
        if (bookData?.length > 0) {
          axiosSecure
            .put(`/my-all-books/${user?.email}`, updateMyAllBooksInfo)
            .then((res) => {
              if (res.data?.modifiedCount > 0) {
                toast.success("Book information updated");
              }
            });
        }
        toast.success("Update successful");
        setNewName(name);
        setNewPhoto(photo);
        setIsOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    const newPassword = e.target.password.value;
    changePassword(newPassword)
      .then(() => toast.success("Password changed successfully"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center p-3 md:p-7">
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-lg mx-auto">
        <div
          className="p-6 flex items-center justify-center"
          style={{
            backgroundImage: `url(${BGBlue})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={photoURL}
            className="rounded-full h-32 w-32 border-4 border-white"
            alt="Profile"
          />
        </div>
        <div className="p-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">
              {user.displayName}
            </p>
            <p className="text-sm text-gray-500">{email}</p>
            <p className="text-sm text-gray-500 mt-1">User ID: {user?.uid}</p>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <p className="font-medium">Account Created</p>
              <p className="text-gray-900">
                {new Date(parseInt(metadata.createdAt, 10)).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <p className="font-medium">Last Login</p>
              <p className="text-gray-900">
                {new Date(
                  parseInt(reloadUserInfo.lastLoginAt, 10)
                ).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-6 flex space-x-4 justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-blue-500 text-white px-1 md:px-3 py-[6px] rounded-lg hover:bg-blue-600 transition duration-300"
            >
              <FaEdit className="md:mr-2" /> Update Profile
            </button>
            <button
              onClick={() => setIsPassOpen(true)}
              className="flex items-center bg-indigo-500 text-white px-1 md:px-3 py-[6px] rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              <FaKey className="md:mr-2" /> Change Password
            </button>
          </div>
        </div>
      </div>
      <EditProfileModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        photoURL={newPhoto}
        displayName={newName}
        handleUpdate={handleUpdate}
      />
      <ChangePassModal
        closeModal={() => setIsPassOpen(false)}
        isPassOpen={isPassOpen}
        handleChangePass={handleChangePass}
      />
    </div>
  );
};

export default MyProfile;
