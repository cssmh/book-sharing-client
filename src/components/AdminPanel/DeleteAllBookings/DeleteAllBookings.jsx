import swal from "sweetalert";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import toast from "react-hot-toast";

const DeleteAllBookings = ({ setAdminBookings }) => {
  const { axiosSecure } = useAxiosHook();
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
              setAdminBookings([]);
              swal("all bookings are deleted!", {
                icon: "success",
              });
            }
          })
          .catch((err) => toast.error(err));
      } else {
        swal("bookings are safe");
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDeleteAllBookings}
        className="bg-green-500 px-3 py-[6px] rounded-md text-white"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default DeleteAllBookings;
