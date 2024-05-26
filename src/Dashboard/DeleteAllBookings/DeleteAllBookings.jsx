import swal from "sweetalert";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Shared/useCustomHook/useAxiosSecure";

const DeleteAllBookings = ({ setAllBookings }) => {
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
              });
              setAllBookings([]);
            } else {
              swal("no bookings available");
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
        className="bg-green-400 px-3 py-[6px] rounded-md text-white"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default DeleteAllBookings;
