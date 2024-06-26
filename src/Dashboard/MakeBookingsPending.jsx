import toast from "react-hot-toast";
import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const MakeBookingsPending = ({ refetch }) => {
  const axiosSecure = useAxiosSecure();
  const handleMakeBookingsPending = () => {
    swal({
      title: "Are you sure?",
      text: "You're making all bookings pending!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure
          .put("/update-to-pending")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              swal("all bookings are now pending!", {
                icon: "success",
                timer: 2000,
              });
              refetch();
            } else {
              swal("Nothing changed", {
                timer: 2000,
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
