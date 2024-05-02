import swal from "sweetalert";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import toast from "react-hot-toast";

const MakeBookingsPending = () => {
  const { axiosSecure } = useAxiosHook();
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
          .put("/updateToPending")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              swal("All bookings are bow pending!", {
                icon: "success",
              });
            }
          })
          .catch((err) => toast.error(err));
      } else {
        swal("All bookings remain same");
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
