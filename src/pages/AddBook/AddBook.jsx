import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import addBook from "../../assets/DataAdd.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useMyBooks from "../../Hooks/useMyBooks";

const AddBook = () => {
  const { user } = useAuth();
  const axiosNoToken = useAxiosPublic();

  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData: myAddedBooks, refetch } = useMyBooks(url);

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
    const book_provider_phone = form.book_provider_phone.value;
    const provider_location = form.provider_location.value;
    const description = form.description.value;
    const book_status = "available";

    if (!/^(\+?8801|01)(\d{9})$/.test(book_provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const BookInformation = {
      book_name,
      book_image,
      book_provider_name,
      book_provider_email,
      book_provider_image,
      book_provider_phone,
      provider_location,
      description,
      book_status,
    };

    axiosNoToken
      .post("/book", BookInformation)
      .then((res) => {
        if (res.data?.insertedId) {
          Swal.fire({
            title: "Thank You!",
            text: `${book_name} added`,
            icon: "success",
            timer: 2000,
          });
          form.reset();
          refetch();
        }
      })
      .catch();
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | Add-Book</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <HashLoader color="#9933FF" size={32} />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
            <div className="w-2/3 md:w-[31%]">
              <img
                className="md:w-[65%] mx-auto"
                src={addBook}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="text-center md:w-2/2">
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
                  name="provider_location"
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
                  name="book_provider_phone"
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
