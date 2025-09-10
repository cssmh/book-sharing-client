import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import toast from "react-hot-toast";
import updateImage from "../assets/DocUpdate.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import SmallLoader from "../Components/SmallLoader";
import useDataQuery from "../Hooks/useDataQuery";
import { updateBook } from "../Api/books";
import HavenHelmet from "../Components/HavenHelmet";

const UpdateBook = () => {
  const { user } = useAuth();
  const apiKey = import.meta.env.VITE_imgBbKey;
  const [loadingImage, setLoadingImage] = useState(false);
  const bookData = useLoaderData();
  const navigateTo = useNavigate();

  const url = `/providers-books?email=${user?.email}`;
  const { isLoading: loading, data: myBooks = [] } = useDataQuery(
    ["myBooks"],
    url
  );

  const [imagePreview, setImagePreview] = useState(bookData.book_image);
  const [bookImage, setBookImage] = useState(bookData.book_image);

  useEffect(() => {
    const checkMatching = async () => {
      if (!loading && myBooks && bookData) {
        const matching = myBooks.find((book) => book._id === bookData?._id);
        if (!matching) {
          toast.error("Don't try to update other's data!");
          navigateTo("/");
        }
      }
    };

    checkMatching();
  }, [loading, myBooks, bookData, navigateTo]);

  if (loading) return <SmallLoader size={76} />;

  const handleImageUpload = async (e) => {
    setLoadingImage(true);
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data.success) {
        setBookImage(data.data.url);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error("Image upload failed. Please try again.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedBookInfo = {
      book_name: form.book_name.value,
      book_image: bookImage,
      provider_phone: form.provider_phone.value,
      provider_location: form.provider_location.value,
      description: form.description.value,
    };

    if (!/^(\+?8801|01)(\d{9})$/.test(updatedBookInfo.provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    try {
      const res = await updateBook(bookData._id, user?.email, updatedBookInfo);
      if (res?.modifiedCount > 0) {
        swal({
          title: "Good job!",
          text: "Book Info Updated",
          icon: "success",
          timer: 2000,
        });
        navigateTo(-1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HavenHelmet title={bookData.book_name} />
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
        <div className="w-[50%] md:w-[31%]">
          <img
            src={updateImage}
            className="md:w-[55%] mx-auto"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="text-center md:w-2/2">
          <h1 className="text-2xl md:text-2xl font-bold mx-2 md:mx-0">
            Update <span className="text-green-400">{bookData.book_name}</span>
          </h1>
          <p className="text-gray-500 mt-2 mx-2 md:mx-0">
            Enter Book details and click Update Book Details button to <br />{" "}
            Update the Book data to the database
          </p>
        </div>
      </div>
      <form
        onSubmit={handleUpdate}
        className="container 2xl:max-w-[1370px] mx-auto"
      >
        <div className="flex justify-center lg:justify-end my-2">
          <div className="w-[100px] h-[120px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              name="book_name"
              defaultValue={bookData.book_name}
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Image Upload</span>
            </label>
            <input
              type="file"
              name="book_image"
              className="file-input file-input-bordered focus:border-transparent"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Phone Number</span>
            </label>
            <input
              type="text"
              name="provider_phone"
              defaultValue={bookData.provider_phone}
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Location</span>
            </label>
            <input
              type="text"
              name="provider_location"
              defaultValue={bookData.provider_location}
              required
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-2 lg:mx-0">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={bookData.description}
            rows={5}
            className="textarea textarea-bordered focus:border-transparent"
            style={{ outline: "none" }}
            placeholder="Write something about your book..."
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button
            disabled={loadingImage}
            className="btn btn-primary rounded-2xl mx-2 md:mx-0 text-white"
          >
            {loadingImage ? "Updating..." : "Update Book Details"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
