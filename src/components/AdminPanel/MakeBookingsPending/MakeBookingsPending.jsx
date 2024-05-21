import swal from "sweetalert";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import toast from "react-hot-toast";

const MakeBookingsPending = () => {
  const axiosSecure = useAxiosHook();
  const handleMakeBookingsPending = () => {
    swal({
      title: "Are you sure?",
      text: "You're making all bookings pending from completed!",
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
      Make all Bookings Pending & Delete Completed at
    </button>
  );
};

export default MakeBookingsPending;
