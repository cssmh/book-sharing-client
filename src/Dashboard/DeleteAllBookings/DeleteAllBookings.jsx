import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const DeleteAllBookings = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleDeleteAllBookings = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You're deleting all bookings",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete("/all-bookings")
          .then((res) => {
            if (res.data?.deletedCount > 0) {
              Swal.fire({
                text: "all bookings are deleted!",
                icon: "success",
              });
              refetch();
            } else {
              Swal.fire({
                text: "no bookings available",
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
        className="bg-green-500 px-3 py-[6px] rounded-md text-white"
      >
        Delete All Bookings
      </button>
    </div>
  );
};

export default DeleteAllBookings;
