import axios from "axios";
import swal from "sweetalert";
import useContextHook from "../../useCustomHook/useContextHook";
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
          swal("Good job!", `${book_name} added`, "success");
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
      <form
        onSubmit={handleAddBook}
        className="md:w-3/4 lg:w-1/2 mx-2 md:mx-auto"
      >
        <div className="form-control">
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Image Url</span>
          </label>
          <input
            type="text"
            name="book_image"
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
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

        <div className="form-control">
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
        <div className="form-control">
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

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            cols="20"
            rows="10"
            className="rounded-lg"
          ></textarea>
        </div>

        <div className="form-control">
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

        <div className="form-control mt-6">
          <button className="btn btn-primary text-white">Add Book</button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
