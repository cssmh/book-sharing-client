import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import { FaEdit, FaKey } from "react-icons/fa";
import BGBlue from "../assets/Notified.jpg";
import EditProfileModal from "./Modal/EditProfileModal";
import ChangePassModal from "./Modal/ChangePassModal";
import useDataQuery from "../Hooks/useDataQuery";
import { updateAllBooks } from "../Api/books";

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPassOpen, setIsPassOpen] = useState(false);
  const { user, handleUpdateProfile, changePassword } = useAuth();
  const { photoURL, email, displayName, metadata, reloadUserInfo } = user;

  const url = `/providers-books?email=${user?.email}`;
  const { data: bookData = [] } = useDataQuery(["myBooks"], url);

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
      .then(async () => {
        if (bookData?.length > 0) {
          const res = await updateAllBooks(user?.email, updateMyAllBooksInfo);
          if (res?.modifiedCount > 0) {
            toast.success("Book information updated");
          }
        }
        toast.success("Update successful");
        setNewName(name);
        setNewPhoto(photo);
        setIsOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    const newPassword = e.target.password.value;
    await changePassword(newPassword)
      .then(() => toast.success("Password changed successfully"))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center md:p-8">
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto overflow-hidden">
        <div
          className="relative pt-16 pb-8 text-center bg-cover bg-center"
          style={{ backgroundImage: `url(${BGBlue})` }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <img
            src={photoURL}
            className="relative rounded-full h-24 w-24 md:h-32 md:w-32 border-4 border-white mx-auto"
            alt="Profile"
            style={{ marginTop: "-3rem" }}
          />
          <h1 className="relative text-2xl md:text-3xl font-bold text-white mt-4">
            {displayName}
          </h1>
          <p className="relative text-sm text-gray-200">{email}</p>
          <p className="relative text-sm text-gray-200 mt-1">
            User ID: {user?.uid}
          </p>
        </div>
        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 text-center">
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
          <div className="mt-4 md:mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            >
              <FaEdit className="mr-2" /> Update Profile
            </button>
            <button
              onClick={() => setIsPassOpen(true)}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
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
