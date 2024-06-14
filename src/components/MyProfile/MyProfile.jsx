import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EditModal from "./EditModal";
import useMyBooks from "../../Hooks/useMyBooks";

const MyProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, handleUpdateProfile } = useAuth();
  const { photoURL, email, displayName, metadata, reloadUserInfo } = user;

  const url = `/my-books?email=${user?.email}`;
  const { bookData } = useMyBooks(url);

  const [newName, setNewName] = useState(displayName);
  const [newPhoto, setNewPhoto] = useState(photoURL);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const get_image = form.photo.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const photo = get_image.trim() !== "" ? get_image : defaultImageUrl;

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

  return (
    <div>
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-normal h-[80vh] md:gap-5">
        <div className="w-1/2">
          <img
            src={photoURL}
            className="rounded-lg lg:w-52 ml-auto px-3 lg:px-0"
          />
        </div>
        <div className="flex flex-col items-center md:items-start w-full max-w-md">
          <p className="text-lg font-semibold mb-2">Hi, {displayName}</p>
          <p className="text-sm text-gray-600 mb-2">{email}</p>
          <p className="text-sm text-gray-600 mb-2">
            Account Created:{" "}
            {new Date(parseInt(metadata.createdAt, 10)).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            Last Login:{" "}
            {new Date(
              parseInt(reloadUserInfo.lastLoginAt, 10)
            ).toLocaleString()}
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white px-3 py-[5px] rounded-lg"
          >
            Edit Profile
          </button>
        </div>
      </div>
      <EditModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen}
        photoURL={newPhoto}
        displayName={newName}
        handleUpdate={handleUpdate}
      ></EditModal>
    </div>
  );
};

export default MyProfile;
