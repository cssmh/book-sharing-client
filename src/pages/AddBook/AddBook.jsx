import axios from "axios";
import swal from "sweetalert";
import useContextHook from "../../useCustomHook/useContextHook";
import addBook from "../../assets/BookAdd.png";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const AddBook = () => {
  const { user } = useContextHook();
  const handleAddBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const book_name = form.book_name.value;

    const get_image = form.book_image.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/soon.jpg";

    const book_image = get_image.trim() !== "" ? get_image : defaultImageUrl;
    const book_provider_name = form.book_provider_name.value;
    const book_provider_email = form.book_provider_email.value;
    const book_provider_image = user.photoURL;
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
      .post("https://book-sharing-server.vercel.app/books", BookInformation)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          swal("Thank You!", `${book_name} Book added`, "success");
          form.reset();
        }
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | Add-Book</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-6">
        <img src={addBook} alt="" />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Add Book to the <span className="text-green-400">Database</span>
          </h1>
          <p className="text-gray-500 mt-2 mx-2 md:mx-0">
            Enter Book details and click Add Book button to add Book <br></br>
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
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Image Url</span>
            </label>
            <input
              type="text"
              name="book_image"
              className="input input-bordered"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Provider Name</span>
            </label>
            <input
              type="text"
              name="book_provider_name"
              defaultValue={user?.displayName}
              className="input input-bordered"
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Book Provider Email</span>
            </label>
            <input
              type="email"
              readOnly
              name="book_provider_email"
              defaultValue={user?.email}
              className="input input-bordered"
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
              className="input input-bordered"
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
              className="input input-bordered"
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
            className="rounded-xl"
          ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
