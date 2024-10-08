import { useEffect } from "react";
import swal from "sweetalert";
import toast from "react-hot-toast";
import updateImage from "../../assets/DocUpdate.png";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import SmallLoader from "../../Components/SmallLoader";
import useDataQuery from "../../Hooks/useDataQuery";
import { updateBook } from "../../Api/books";
import HavenHelmet from "../../Components/HavenHelmet";

const UpdateBook = () => {
  const { user } = useAuth();
  const bookData = useLoaderData();
  const navigateTo = useNavigate();

  const url = `/providers-books?email=${user?.email}`;
  const { isLoading: loading, data: myBooks = [] } = useDataQuery(
    ["myBooks"],
    url
  );

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;
    const book_image = form.book_image.value || import.meta.env.VITE_Cover_URL;
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

    try {
      const res = await updateBook(_id, user?.email, updatedBookInfo);
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
      console.log(error);
    }
  };

  return (
    <div>
      <HavenHelmet title={book_name} />
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
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
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
          <div className="form-control md:w-1/2 mx-2 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Image Url</span>
            </label>
            <input
              type="text"
              name="book_image"
              defaultValue={
                book_image === import.meta.env.VITE_Cover_URL ? "" : book_image
              }
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
              defaultValue={provider_location}
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
              name="provider_phone"
              defaultValue={provider_phone}
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
            defaultValue={description}
            cols="10"
            rows={rows}
            className="rounded-2xl border-gray-300 focus:border-transparent"
          ></textarea>
        </div>
        <div className="form-control my-6">
          <button className="btn btn-primary rounded-2xl mx-2 md:mx-0 text-white">
            Update Book Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBook;
