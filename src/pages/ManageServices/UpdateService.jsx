import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const UpdateService = () => {
  const service = useLoaderData();
  const { _id, book_image, book_name, description, location, phone } = service;
  const navigateTo = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = event.target;
    const book_name = form.book_name.value;
    const book_image = form.book_image.value;
    const location = form.location.value;
    const description = form.description.value;
    const phone = form.phone.value;
    const service = {
      location,
      book_name,
      book_image,
      description,
      phone,
    };
    // console.log(service);
    axios
      .put(`https://book-sharing-server.vercel.app/books/${_id}`, service)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: `${book_name} Updated`,
          });
          navigateTo(-1);
        }
      });
  };

  // Update book details form
  return (
    <div>
      <Helmet>
        <title>Update {book_name}</title>
      </Helmet>
      <form
        onSubmit={handleUpdate}
        className=" md:w-3/4 lg:w-1/2 mx-2 md:mx-auto"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Name</span>
          </label>
          <input
            id="cars"
            name="book_name"
            defaultValue={book_name}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Book Image Url</span>
          </label>
          <input
            type="text"
            name="book_image"
            defaultValue={book_image}
            className="input input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            defaultValue={location}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={description}
            cols="20"
            rows="10"
            className="rounded-lg"
          ></textarea>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            defaultValue={phone}
            className="input input-bordered"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn border-green-400 hover:border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">Update Book Details</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateService;
