import axios from "axios";
import swal from "sweetalert";
import useContextHook from "../../useCustomHook/useContextHook";
import addBook from "../../assets/DataAdd.png";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { HashLoader } from "react-spinners";

const AddBook = () => {
  const { user } = useContextHook();
  const axiosCustom = useAxiosHook();
  const [myAddedBooks, setMyAddedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `/myBooks?email=${user?.email}`;
  useEffect(() => {
    axiosCustom.get(url).then((res) => {
      setMyAddedBooks(res?.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;

    // Check for duplicate book name
    const isDuplicate = myAddedBooks?.find(
      (myBook) => myBook.book_name === book_name
    );
    if (isDuplicate) {
      return toast.error("You already added this Book!");
    }

    const get_image = form.book_image.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/CoverSoon.png";

    const book_image = get_image.trim() !== "" ? get_image : defaultImageUrl;
    const book_provider_name = form.book_provider_name.value;
    const book_provider_email = form.book_provider_email.value;
    const book_provider_image = user?.photoURL;
    const location = form.location.value;
    const description = form.description.value;
    const phone = form.phone.value;

    if (!/^(\+?8801|01)(\d{9})$/.test(phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const BookInformation = {
      location,
      book_name,
      book_image,
      book_provider_email,
      book_provider_name,
      description,
      phone,
      book_provider_image,
    };

    axios
      .post("https://book-sharing-server.vercel.app/book", BookInformation)
      .then((res) => {
        if (res.data?.insertedId) {
          // Update myAddedBooks state after successfully adding the book
          // To prevent duplicate adding
          setMyAddedBooks([...myAddedBooks, BookInformation]);
          swal("Thank You!", `${book_name} Book added`, "success");
          form.reset();
        }
      })
      .then(() => {
        // console.log(err);
      });
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | Add-Book</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-6 px-1 md:px-0">
            <img
              src={addBook}
              onContextMenu={(e) => e.preventDefault()}
            />
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-bold mx-2 md:mx-0">
                Add Book to the <span className="text-green-400">Database</span>
              </h1>
              <p className="text-gray-500 mt-2 mx-2 md:mx-0">
                Enter Book details and click Add Book button to add Book{" "}
                <br></br>
                to the database. Must add your location <br></br> and your Valid
                Phone number
              </p>
            </div>
          </div>
          <form onSubmit={handleAddBook} className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
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
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Image Url</span>
                </label>
                <input
                  type="text"
                  name="book_image"
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="book_provider_name"
                  readOnly
                  defaultValue={user?.displayName}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  name="book_provider_email"
                  defaultValue={user?.email}
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
                  name="location"
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
                  defaultValue={"+880"}
                  name="phone"
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
                placeholder="Write something about your book..."
                cols="10"
                rows="5"
                className="rounded-2xl border-gray-300 focus:border-transparent"
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Add Book</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddBook;
