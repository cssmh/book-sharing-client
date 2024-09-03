import swal from "sweetalert";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { addBooking } from "../../Api/bookings";
import useMyData from "../../Hooks/useMyData";

const AddBooking = ({ getBookData }) => {
  const { user } = useAuth();
  const { myBookings, refetch, cartRefetch } = useMyData();
  const { _id, book_image, book_name, provider_email, provider_phone } =
    getBookData;

  const [open, setOpen] = useState(false);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set today's date and time as default
  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, "0")}-${(
      today.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${today.getFullYear()}`;
    const formattedTime = today.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    setTodayDateTime(`${formattedDate}, ${formattedTime}`);
  }, []);

  const handlePopUp = () => setOpen(true);
  const closePop = () => setOpen(false);

  const handleAddBooking = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = e.target;
    const book_id = _id;
    const book_name = form.book_name.value;
    const provider_email = form.provider_email.value;
    const user_email = user?.email;
    const user_date = form.user_date.value;
    const user_location = form.user_location.value;
    const user_message = form.user_message.value;
    const user_phone = form.user_phone.value;
    const status = "Pending";

    if (!/^(\+?8801|01)(\d{9})$/.test(user_phone)) {
      setIsSubmitting(false);
      return toast.error("Enter a valid phone number!");
    }

    const hasBooking = myBookings.some(
      (booking) =>
        booking.user_email === user_email && booking.book_name === book_name
    );

    if (hasBooking) {
      setIsSubmitting(false);
      return swal({
        text: "You already booked this!",
        icon: "error",
        timer: 2000,
      });
    }

    const AddBookingData = {
      book_id,
      book_name,
      book_image,
      provider_email,
      provider_phone,
      user_email,
      user_phone,
      user_location,
      user_date,
      user_message,
      status,
    };

    try {
      const res = await addBooking(AddBookingData);
      if (res?.insertedId) {
        swal({
          title: "Congratulations",
          text: "Booking Complete",
          icon: "success",
          timer: 2000,
        });
        refetch();
        cartRefetch();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOpen(false);
      setIsSubmitting(false);
    }
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
          <form onSubmit={handleAddBooking} className="md:w-[65%] mx-auto">
            <div className="flex flex-col md:flex-row gap-1 md:gap-3">
              <div className="form-control md:w-1/2">
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
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">
                    Booking Date & Time (Today)
                  </span>
                </label>
                <input
                  type="text"
                  name="user_date"
                  readOnly
                  defaultValue={todayDateTime}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-3">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Book Provider Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  name="provider_email"
                  defaultValue={provider_email}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-3">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Your Phone Number</span>
                </label>
                <input
                  type="text"
                  required
                  name="user_phone"
                  defaultValue="+880"
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Your Location</span>
                </label>
                <input
                  type="text"
                  required
                  name="user_location"
                  className="input input-bordered focus:border-transparent"
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  Any Message for Book Provider?
                </span>
              </label>
              <textarea
                name="user_message"
                cols="5"
                rows="5"
                className="rounded-2xl focus:border-transparent"
              ></textarea>
            </div>
            <div className="form-control mt-5">
              <button
                type="submit"
                className="btn btn-primary text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Booking"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBooking;
