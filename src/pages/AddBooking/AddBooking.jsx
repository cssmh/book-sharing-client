import swal from "sweetalert";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useMyCart from "../../Hooks/useMyCart";

const AddBooking = ({ getBookData }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosNoToken = useAxiosPublic();
  const { cartRefetch } = useMyCart();

  const { _id, book_image, book_name, provider_email, provider_phone } =
    getBookData;

  const [open, setOpen] = useState(false);
  const [matchFound, setMatchFound] = useState([]);
  const [todayDateTime, setTodayDateTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitTimeoutRef = useRef(null);

  const { data: allBookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user?.email}`);
      return res?.data;
    },
  });

  // Check if the selected book is already booked
  useEffect(() => {
    if (allBookings?.length > 0) {
      const matching = allBookings.filter((myBooked) =>
        book_name.includes(myBooked.book_name)
      );
      setMatchFound(matching);
    }
  }, [allBookings, book_name]);

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
    const dateTime = `${formattedDate}, ${formattedTime}`;
    setTodayDateTime(dateTime);
  }, []);
  // Set today's date and time as default end

  const handlePopUp = () => {
    if (matchFound.length > 0) {
      return swal({
        text: "You already booked this!",
        icon: "error",
        timer: 2000,
      });
    }
    setOpen(true);
  };

  const closePop = () => {
    setOpen(false);
  };

  const handleAddBooking = (e) => {
    e.preventDefault();
    // Prevent multiple submissions clicking
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
    }
    submitTimeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    //  more than one time in a second
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
      return toast.error("Enter a valid phone number!");
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

    axiosNoToken
      .post("/add-booking", AddBookingData)
      .then((res) => {
        if (res.data?.insertedId) {
          swal({
            title: "Congratulations",
            text: "Booking Complete",
            icon: "success",
            timer: 2000,
          });
          refetch();
          cartRefetch();
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setOpen(false);
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
          <form onSubmit={handleAddBooking} className="md:w-[65%] mx-auto">
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
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
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
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
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
            <div className="flex flex-col md:flex-row gap-3">
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
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
              <div className="form-control md:w-1/2 mx-3 lg:mx-0">
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
            <div className="form-control mx-3 lg:mx-0">
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
              <button className="btn btn-primary text-white">
                Add Booking
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBooking;
