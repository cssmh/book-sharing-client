import toast from "react-hot-toast";
import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const DeleteAllBookings = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDeleteAllBookings = () => {
    swal({
      title: "Are you sure?",
      text: "You're deleting all bookings",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure
          .delete("/all-bookings")
          .then((res) => {
            if (res.data.deletedCount > 0) {
              swal("all bookings are deleted!", {
                icon: "success",
                timer: 2000,
              });
              refetch();
            } else {
              swal("no bookings available", {
                timer: 2000,
              });
            }
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDeleteAllBookings}
        className="bg-red-500 text-white py-[5px] px-3 rounded-md transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default DeleteAllBookings;
