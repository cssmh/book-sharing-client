import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMyBooks from "../Hooks/useMyBooks";
import { FaEdit, FaKey } from "react-icons/fa";
import BGBlue from "../assets/Notified.jpg";
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
    <div className="bg-gray-100 flex items-center justify-center p-5 md:p-10">
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-md overflow-hidden w-full max-w-2xl mx-auto">
        <div
          className="p-3 text-center"
          style={{
            backgroundImage: `url(${BGBlue})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={photoURL}
            className="rounded-full h-40 w-40 border-4 border-white mx-auto"
            alt="Profile"
          />
          <h1 className="text-2xl font-bold text-white mt-4">
            {user.displayName}
          </h1>
          <p className="text-sm text-gray-200">{email}</p>
          <p className="text-sm text-gray-200 mt-1">User ID: {user?.uid}</p>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="font-medium">Account Created:</div>
            <div className="text-gray-900">
              {new Date(parseInt(metadata.createdAt, 10)).toLocaleString()}
            </div>
            <div className="font-medium">Last Login:</div>
            <div className="text-gray-900">
              {new Date(
                parseInt(reloadUserInfo.lastLoginAt, 10)
              ).toLocaleString()}
            </div>
          </div>
          <div className="mt-8 flex space-x-4 justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <FaEdit className="mr-2" /> Update Profile
            </button>
            <button
              onClick={() => setIsPassOpen(true)}
              className="flex items-center bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <FaKey className="mr-2" /> Change Password
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
