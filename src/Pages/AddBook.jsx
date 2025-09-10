import axios from "axios";
import swal from "sweetalert";
import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import addBook from "../assets/DataAdd.png";
import SmallLoader from "../Components/SmallLoader";
import useDataQuery from "../Hooks/useDataQuery";
import { postBook } from "../Api/books";
import HavenHelmet from "../Components/HavenHelmet";
import { useState } from "react";

const AddBook = () => {
  const { loading, user } = useAuth();
  const apiKey = import.meta.env.VITE_imgBbKey;
  const url = `/providers-books?email=${user?.email}`;
  const {
    isLoading,
    data: myBooks = [],
    refetch,
  } = useDataQuery(["myBooks"], url);

  const [imagePreview, setImagePreview] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [bookImage, setBookImage] = useState("");

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

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
          headers: {
            "Content-Type": "multipart/form-data",
          },
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

  const handleAddBook = async (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;
    if (myBooks.some((myBook) => myBook.book_name === book_name)) {
      return toast.error("You already added this Book!");
    }

    const provider_phone = form.provider_phone.value;
    if (!/^(\+?8801|01)(\d{9})$/.test(provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const BookInformation = {
      book_name,
      book_image: bookImage || import.meta.env.VITE_Cover_URL,
      provider_name: form.provider_name.value,
      provider_email: form.provider_email.value,
      provider_image: user?.photoURL,
      provider_phone,
      provider_location: form.provider_location.value,
      description: form.description.value,
      added_time: formattedDate,
      book_status: "available",
    };

    try {
      const res = await postBook(BookInformation);
      if (res?.insertedId) {
        swal({
          title: "Thank You!",
          text: `${book_name} added`,
          icon: "success",
          timer: 2000,
        });
        setImagePreview("");
        form.reset();
        refetch();
      }
    } catch (error) {
      toast.error("Failed to add the book. Please try again.");
    }
  };

  if (loading || isLoading) return <SmallLoader size={80} />;

  return (
    <div className="mb-8">
      <HavenHelmet title="Add Book" />
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
        <div className="w-2/3 md:w-[31%]">
          <img
            className="w-[65%] mx-auto"
            src={addBook}
            onContextMenu={(e) => e.preventDefault()}
            alt="Add Book"
          />
        </div>
        <div className="text-center md:w-2/2">
          <h1 className="text-2xl md:text-2xl font-bold mx-2 md:mx-0">
            Add Book to the <span className="text-green-400">Database</span>
          </h1>
          <p className="text-gray-500 mt-2 mx-2 md:mx-0">
            Enter Book details and click Add Book button to add Book <br />
            to the database. Must add your location <br />
            and your Valid Phone number
          </p>
        </div>
      </div>
      <form
        onSubmit={handleAddBook}
        className="container 2xl:max-w-[1370px] mx-auto"
      >
        {imagePreview && (
          <div className="flex justify-center lg:justify-end my-2">
            <div className="w-[100px] h-[120px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              name="book_name"
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
              onChange={handleImageUpload}
              accept="image/*"
              className="file-input file-input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              name="provider_name"
              readOnly
              defaultValue={user?.displayName}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              readOnly
              name="provider_email"
              defaultValue={user?.email}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              required
              name="provider_location"
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              required
              defaultValue={"+880"}
              name="provider_phone"
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
            placeholder="Write something about your book..."
            cols="10"
            rows="5"
            className="rounded-2xl border-gray-300 focus:border-transparent"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button
            disabled={loadingImage}
            className="btn btn-primary rounded-2xl mx-2 md:mx-0 text-white"
          >
            {loadingImage ? "Uploading..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
