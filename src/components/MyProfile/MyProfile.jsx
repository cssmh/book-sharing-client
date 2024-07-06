import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EditModal from "./EditModal";
import useMyBooks from "../../Hooks/useMyBooks";
import ChangePassModal from "./ChangePassModal";

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
    <div className="flex items-center justify-center min-h-[78vh] p-4">
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl w-full sm:w-3/4 md:w-1/2 mx-auto">
        <div className="flex flex-col items-center justify-center p-4">
          <img
            src={photoURL}
            className="mx-auto object-cover rounded-full h-24 w-24 mb-2"
            alt="dp"
          />
          <p className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full">
            {email}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div>
                <p className="flex flex-col w-full sm:w-auto">
                  Name
                  <span className="font-bold text-black">
                    {user.displayName}
                  </span>
                </p>
                <p className="flex flex-col w-full sm:w-auto">
                  Account Created:
                  <span className="font-bold text-black">
                    {new Date(
                      parseInt(metadata.createdAt, 10)
                    ).toLocaleString()}
                  </span>
                </p>
              </div>
              <div>
                <p className="flex flex-col w-full sm:w-auto">
                  Email
                  <span className="font-bold text-black">{user.email}</span>
                </p>
                <p className="flex flex-col w-full sm:w-auto">
                  Last Login:
                  <span className="font-bold text-black">
                    {new Date(
                      parseInt(reloadUserInfo.lastLoginAt, 10)
                    ).toLocaleString()}
                  </span>
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-green-500 px-10 py-1 rounded-lg text-white cursor-pointer block mb-1"
                >
                  Update Profile
                </button>
                <button
                  onClick={() => setIsPassOpen(true)}
                  className="bg-pink-500 px-[30px] py-1 rounded-lg text-white cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditModal
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
