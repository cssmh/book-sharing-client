import swal from "sweetalert";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { HashLoader } from "react-spinners";
import updateImage from "../../assets/Update.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useContextHook from "../../useCustomHook/useContextHook";
import { useQuery } from "@tanstack/react-query";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import useAxiosPublic from "../../useCustomHook/useAxiosPublic";

const UpdateBook = () => {
  const { user } = useContextHook();
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [matchFound, setMatchFound] = useState(null);
  const axiosSecure = useAxiosHook();
  const axiosNoToken = useAxiosPublic()

  const { data: bookData, isLoading } = useQuery({
    queryKey: ["bookData", id],
    queryFn: async () => {
      const res = await axiosNoToken.get(`book/${id}`);
      return res?.data;
    },
  });

  useEffect(() => {
    if (matchFound === false) {
      toast.error("Don't try to update other's data!");
      navigateTo("/");
    }
  }, [matchFound, navigateTo]);

  useEffect(() => {
    if (bookData && user) {
      const url = `/my-books?email=${user?.email}`;
      axiosNoToken.get(url).then((res) => {
        const findMatching = res?.data.find(
          (book) => book._id === bookData._id
        );
        setMatchFound(!!findMatching);
      });
    }
  }, [axiosNoToken, bookData, user]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#9933FF" size={32} />
      </div>
    );
  }

  if (!bookData) {
    return null;
  }

  const {
    _id,
    book_name,
    book_image,
    book_provider_phone,
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
    const book_provider_phone = form.book_provider_phone.value;
    const provider_location = form.provider_location.value;
    const description = form.description.value;

    if (!/^(\+?8801|01)(\d{9})$/.test(book_provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const updatedBookInfo = {
      book_name,
      book_image,
      book_provider_phone,
      provider_location,
      description,
    };

    axiosSecure
      .put(`/book/${_id}/${user?.email}`, updatedBookInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data?.modifiedCount > 0) {
          swal("Good job!", "Book Info Updated", "success");
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
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-6 px-1 md:px-0">
        <img
          src={updateImage}
          className="md:w-[28%]"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="text-center">
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
              name="book_provider_phone"
              defaultValue={book_provider_phone}
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
          <button className="btn border-green-400 hover:border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
            Update Book Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
