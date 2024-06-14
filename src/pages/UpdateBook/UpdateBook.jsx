import swal from "sweetalert";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import updateImage from "../../assets/Update.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyBooks from "../../Hooks/useMyBooks";
import SmallLoader from "../../Components/AllLoader/SmallLoader";
import useQueryPublic from "../../Hooks/useQueryPublic";

const UpdateBook = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [matchFound, setMatchFound] = useState([]);
  const axiosSecure = useAxiosSecure();

  const url = `/my-books?email=${user?.email}`;
  const { isLoading: loading, bookData: myBooks } = useMyBooks(url);

  const {
    data: bookData,
    isLoading,
    refetch,
  } = useQueryPublic(["bookData", id], `book/${id}`);

  useEffect(() => {
    const matching = myBooks.find((book) => book._id === id);
    setMatchFound(matching);
    if (!matchFound) {
      toast.error("Don't try to update other's data!");
      navigateTo("/");
    }
  }, [matchFound, myBooks, id, navigateTo]);

  if (loading || isLoading) {
    return <SmallLoader />;
  }

  const {
    _id,
    book_name,
    book_image,
    provider_phone,
    description,
    provider_location,
  } = bookData;

  let rowsValue;
  if (description.length > 2000) {
    rowsValue = 20;
  } else if (description.length > 500) {
    rowsValue = 10;
  } else {
    rowsValue = 5;
  }
  const rows = rowsValue;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;
    const get_book_image = form.book_image.value;
    const defaultBookImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/CoverSoon.png";
    const book_image =
      get_book_image.trim() !== "" ? get_book_image : defaultBookImageUrl;
    const provider_phone = form.provider_phone.value;
    const provider_location = form.provider_location.value;
    const description = form.description.value;

    if (!/^(\+?8801|01)(\d{9})$/.test(provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const updatedBookInfo = {
      book_name,
      book_image,
      provider_phone,
      provider_location,
      description,
    };

    axiosSecure
      .put(`/book/${_id}/${user?.email}`, updatedBookInfo)
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          swal({
            title: "Good job!",
            text: "Book Info Updated",
            icon: "success",
            timer: 2000,
          });
          refetch();
          navigateTo(-1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Helmet>
        <title>Update {book_name}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
        <div className="w-2/3 md:w-[31%]">
          <img
            src={updateImage}
            className="md:w-[55%] mx-auto"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
        <div className="text-center md:w-2/2">
          <h1 className="text-2xl md:text-3xl font-bold mx-2 md:mx-0">
            Update <span className="text-green-400">{book_name}</span>
          </h1>
          <p className="text-gray-500 mt-2 mx-2 md:mx-0">
            Enter Book details and click Update Book Details button to <br />{" "}
            Update the Book data to database
          </p>
        </div>
      </div>
      <form onSubmit={handleUpdate} className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Name</span>
            </label>
            <input
              type="text"
              name="book_name"
              required
              defaultValue={book_name}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Image Url</span>
            </label>
            <input
              type="text"
              name="book_image"
              defaultValue={
                book_image ===
                "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/CoverSoon.png"
                  ? ""
                  : book_image
              }
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Location</span>
            </label>
            <input
              type="text"
              required
              name="provider_location"
              defaultValue={provider_location}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="text"
              required
              name="provider_phone"
              defaultValue={provider_phone}
              className="input input-bordered focus:border-transparent"
              style={{ outline: "none" }}
            />
          </div>
        </div>
        <div className="form-control mx-3 lg:mx-0">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={description}
            cols="10"
            rows={rows}
            className="rounded-2xl border-gray-300 focus:border-transparent"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">
            Update Book Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
