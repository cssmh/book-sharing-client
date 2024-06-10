import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeBookingsPending = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleMakeBookingsPending = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You're making all bookings pending!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put("/update-to-pending")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              Swal.fire({
                text: "all bookings are now pending!",
                icon: "success",
              });
              refetch();
            } else {
              Swal.fire({
                text: "Nothing changed",
              });
            }
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <button
      onClick={handleMakeBookingsPending}
      className="bg-green-500 px-3 py-[6px] rounded-md text-white"
    >
      Make all Bookings Pending
    </button>
  );
};

export default MakeBookingsPending;
