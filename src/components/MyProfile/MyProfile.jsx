import { useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import EditModal from "./EditModal";
import useMyBooks from "../../Hooks/useMyBooks";

const MyProfile = () => {
  const { user, handleUpdateProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { photoURL, email, displayName, metadata, reloadUserInfo } = user;
  const url = `/my-books?email=${user?.email}`;
  const { bookData } = useMyBooks(url);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  // account created and last login
  const date = new Date(parseInt(metadata.createdAt, 10));
  const accountCreated = `${date.toLocaleDateString(
    "en-GB"
  )}, ${date.toLocaleTimeString()}`;

  const date2 = new Date(parseInt(reloadUserInfo.lastLoginAt, 10));
  const lastLogin = `${date2.toLocaleDateString(
    "en-GB"
  )}, ${date2.toLocaleTimeString()}`;
  // account created and last login end

  // state for show changed at a time update, no need to reload.
  const [dp, setDp] = useState(photoURL);
  const [name, setName] = useState(displayName);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const get_image = form.photo.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const photo = get_image.trim() !== "" ? get_image : defaultImageUrl;

    const updateMyAllBooksInfo = {
      name,
      photo,
    };

    handleUpdateProfile(name, photo)
      .then(() => {
        setDp(photo);
        setName(name);
        if (bookData?.length > 0) {
          axiosSecure
            .put(`/my-all-books/${user?.email}`, updateMyAllBooksInfo)
            .then((res) => {
              if (res.data?.modifiedCount > 0) {
                toast.success("Book information updated");
              }
            });
        }
        toast.success("update success");
        setIsOpen(false);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | My Profile</title>
      </Helmet>
      <div className="flex flex-col md:flex-row items-center h-[76vh] md:gap-5">
        <div className="w-1/2">
          <img src={dp} className="rounded-lg lg:w-60 ml-auto px-3 lg:px-0" />
        </div>
        <div className="space-y-2 mb-3 lg:mb-0 font-semibold border p-4 rounded-lg text-center md:text-left">
          <p>Hi, {displayName}</p>
          <p>{email}</p>
          <p>Account Created: {accountCreated}</p>
          <p>Last Login: {lastLogin}</p>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-lg py-1 mx-auto btn-primary w-32 text-white"
          >
            Update Profile
          </button>
        </div>
      </div>
      <EditModal
        closeModal={closeModal}
        isOpen={isOpen}
        dp={dp}
        name={name}
        handleUpdate={handleUpdate}
      ></EditModal>
    </div>
  );
};

export default MyProfile;
