import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import swal from "sweetalert";
import updateImage from "../../assets/LogoUpdate.png";
import toast from "react-hot-toast";

const UpdateBook = () => {
  const bookData = useLoaderData();
  const { _id, book_image, book_name, description, location, phone } = bookData;
  const navigateTo = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = event.target;
    const book_name = form.book_name.value;

    const get_image = form.book_image.value;
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/soon.jpg";

    const book_image = get_image.trim() !== "" ? get_image : defaultImageUrl;
    const location = form.location.value;
    const description = form.description.value;
    const phone = form.phone.value;

    if (!/^(\+?8801|01)(\d{9})$/.test(phone)) {
      return toast.error("Enter a valid phone number!");
    }

    const updatedBookInfo = {
      location,
      book_name,
      book_image,
      description,
      phone,
    };
    
    axios
      .put(`http://localhost:5000/books/${_id}`, updatedBookInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("Good job!", "Book Info Updated", "success");
          navigateTo(-1);
        }
      });
  };

  return (
    <div>
      <Helmet>
        <title>Update {book_name}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-6">
        <img src={updateImage} className="md:w-[28%]" alt="" />
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Update <span className="text-green-400">{book_name}</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Enter Book details and click Update Book Details button to <br></br>
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
              name="book_name"
              required
              defaultValue={book_name}
              className="input input-bordered"
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
                "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/soon.jpg"
                  ? ""
                  : book_image
              }
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
              defaultValue={location}
              className="input input-bordered"
            />
          </div>
          <div className="form-control md:w-1/2 mx-3 lg:mx-0">
            <label className="label">
              <span className="label-text">Phone</span>
            </label>
            <input
              type="text"
              required
              name="phone"
              defaultValue={phone}
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
            defaultValue={description}
            cols="10"
            rows="5"
            className="rounded-lg"
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
