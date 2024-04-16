import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";

const AddBookings = ({ getBookData }) => {
  const { user } = useContextHook();
  const { axiosSecure, axiosNoToken } = useAxiosHook();
  const { book_image, book_name, book_provider_email, phone } = getBookData;
  const [open, openChange] = useState(false);
  const [matchFound, setMatchFound] = useState([]);

  // check already booked or not state
  const [allBookings, setAllBookings] = useState([]);

  // check already booked or not
  useEffect(() => {
    const matching = allBookings?.filter((myBooked) =>
      book_name.includes(myBooked?.book_name)
    );
    setMatchFound(matching);
  }, [allBookings, book_name]);
  // check already booked or not end

  const url = `/bookings?email=${user?.email}`;
  useEffect(() => {
    axiosSecure.get(url)?.then((res) => {
      setAllBookings(res.data);
    });
  }, [axiosSecure, url]);

  const handlePopUp = () => {
    if (matchFound.length > 0) {
      return toast.error("You already booked this!");
    }
    openChange(true);
  };
  const closePop = () => {
    openChange(false);
  };

  const handleBook = (e) => {
    e.preventDefault();
    openChange(false);
    const form = e.target;
    const book_name = form.book_name.value;
    const book_provider_email = form.book_provider_email.value;
    const book_purchaser_email = form.book_purchaser_email.value;
    const date = form.date.value;
    const book_image = form.book_image_URL.value;
    const instruction = form.instruction.value;
    const buyerPhone = form.phone.value;
    const status = "Pending";

    const booking = {
      book_name,
      book_image,
      book_provider_email,
      phone,
      book_purchaser_email,
      date,
      instruction,
      buyerPhone,
      status,
    };

    axiosNoToken
      .post("/addBooking", booking)
      .then((res) => {
        if (res.data?.insertedId) {
          // Update allBookings state after successfully adding the booking
          setAllBookings([...allBookings, booking]);
          swal("Congratulations!", "Booking Complete", "success");
        }
      })
      .then(() => {
        // console.log(err);
      });
  };

  return (
    <div>
      <Button onClick={handlePopUp} color="primary" variant="contained">
        Collect this Book
      </Button>
      <Dialog open={open} fullWidth maxWidth="lg">
        <DialogActions>
          <Button onClick={closePop} color="info">
            x
          </Button>
        </DialogActions>
        <DialogContent>
          <form onSubmit={handleBook} className="md:w-[65%] mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Name</span>
                </label>
                <input
                  type="text"
                  readOnly
                  name="book_name"
                  defaultValue={book_name}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Book Image URL</span>
                </label>
                <input
                  type="text"
                  readOnly
                  name="book_image_URL"
                  defaultValue={book_image}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  name="book_purchaser_email"
                  defaultValue={user?.email}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
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
                  defaultValue={book_provider_email}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">Your Phone Number</span>
                </label>
                <input
                  type="text"
                  required
                  name="phone"
                  defaultValue="+880"
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
                <label className="label">
                  <span className="label-text">
                    Pick a Date You Need this book
                  </span>
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="form-control mx-3 lg:mx-0">
              <label className="label">
                <span className="label-text">
                  Any Message for Book Provider?
                </span>
              </label>
              <textarea
                name="instruction"
                cols="5"
                rows="5"
                className="rounded-2xl focus:border-transparent"
              ></textarea>
            </div>
            <div className="form-control mt-5">
              <button className="btn btn-outline border-none bg-green-400 hover:bg-green-400 text-white">
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
