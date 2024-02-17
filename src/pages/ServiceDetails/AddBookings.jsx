import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";

const AddBookings = ({ service }) => {
  const { user } = useContext(AuthContext);
  const { book_image, book_name, book_provider_email } = service;
  const [open, openChange] = useState(false);

  const handlePopUp = () => {
    openChange(true);
  };
  const closePop = () => {
    openChange(false);
  };

  const handleBook = (e) => {
    e.preventDefault();
    openChange(false);
    const form = event.target;
    const book_name = form.book_name.value;
    const book_image = form.book_image.value;
    const book_provider_email = form.book_provider_email.value;
    const user_email = form.user_email.value;
    const date = form.date.value;
    const instruction = form.instruction.value;
    const phone = form.phone.value;
    const status = "pending";

    const booking = {
      book_name,
      book_image,
      book_provider_email,
      user_email,
      date,
      instruction,
      phone,
      status,
    };
    // console.log(booking);

    axios
      .post("https://book-sharing-server.vercel.app/bookings", booking)
      .then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Book purchased",
          });
        }
      })
      .then((err) => {
        console.log(err);
      });
  };
  // Form for booking page
  return (
    <div>
      <Button onClick={handlePopUp} color="primary" variant="contained">
        Collect {book_name}
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogActions>
          <Button onClick={closePop} color="error">
            X
          </Button>
        </DialogActions>
        <DialogContent>
          <form onSubmit={handleBook} className=" md:w-3/4 lg:w-1/2 mx-auto">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Book Name</span>
              </label>
              <input
                type="text"
                readOnly
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
                readOnly
                name="book_image"
                defaultValue={book_image}
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
                defaultValue={book_provider_email}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input
                type="email"
                readOnly
                name="user_email"
                defaultValue={user?.email}
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date you Need this book</span>
              </label>
              <input
                type="date"
                name="date"
                required
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">A Message for Book Provider</span>
              </label>
              <textarea
                name="instruction"
                cols="20"
                rows="10"
                className="rounded-lg"
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Your Phone</span>
              </label>
              <input
                type="text"
                name="phone"
                defaultValue="+880"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-outline bg-green-500 text-white">
                Purchase Book
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBookings;
