import swal from "sweetalert";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import addBook from "../../assets/DataAdd.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useMyBooks from "../../Hooks/useMyBooks";
import SmallLoader from "../../Components/AllLoader/SmallLoader";

const AddBook = () => {
  const { user } = useAuth();
  const axiosNoToken = useAxiosPublic();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData: myBooks, refetch } = useMyBooks(url);

  // Create a new Date object for today's date
  let today = new Date();

  // Define the months array for formatting
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[today.getMonth()];
  let day = today.getDate();
  let year = today.getFullYear();
  let todaysDate = `${month} ${day}, ${year}`;

  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;

    const duplicate = myBooks?.find((myBook) => myBook.book_name === book_name);
    if (duplicate) {
      return toast.error("You already added this Book!");
    }

    const book_image =
      form.book_image.value.trim() ||
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/CoverSoon.png";
    const provider_name = form.provider_name.value;
    const provider_email = form.provider_email.value;
    const provider_image = user?.photoURL;
    const provider_phone = form.provider_phone.value;
    const provider_location = form.provider_location.value;
    const description = form.description.value;
    const added_time = todaysDate;
    const book_status = "available";

    if (!/^(\+?8801|01)(\d{9})$/.test(provider_phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const BookInformation = {
      book_name,
      book_image,
      provider_name,
      provider_email,
      provider_image,
      provider_phone,
      provider_location,
      description,
      added_time,
      book_status,
    };

    axiosNoToken
      .post("/book", BookInformation)
      .then((res) => {
        if (res.data?.insertedId) {
          swal({
            title: "Thank You!",
            text: `${book_name} added`,
            icon: "success",
            timer: 2000,
          });
          form.reset();
          refetch();
        }
      })
      .catch((error) => {
        toast.error("Failed to add the book. Please try again.");
        console.error(error);
      });
  };

  return (
    <div className="mb-8">
      <Helmet>
        <title>BookHaven | Add-Book</title>
      </Helmet>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 mt-3 px-1 md:px-0">
            <div className="w-2/3 md:w-[31%]">
              <img
                className="md:w-[65%] mx-auto"
                src={addBook}
                onContextMenu={(e) => e.preventDefault()}
                alt="Add Book"
              />
            </div>
            <div className="text-center md:w-2/2">
              <h1 className="text-2xl md:text-3xl font-bold mx-2 md:mx-0">
                Add Book to the <span className="text-green-400">Database</span>
              </h1>
              <p className="text-gray-500 mt-2 mx-2 md:mx-0">
                Enter Book details and click Add Book button to add Book <br />
                to the database. Must add your location <br />
                and your Valid Phone number
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
                  name="provider_name"
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
                  name="provider_email"
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
                  name="provider_phone"
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
