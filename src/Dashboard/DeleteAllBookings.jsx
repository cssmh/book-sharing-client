import swal from "sweetalert";
import { deleteAllBookings } from "../Api/Delete";

const DeleteAllBookings = ({ refetch }) => {
  const handleDeleteAllBookings = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });

    if (willDelete) {
      try {
        const res = await deleteAllBookings();
        if (res.deletedCount > 0) {
          swal("All bookings are deleted!", {
            icon: "success",
            timer: 2000,
          });
          refetch();
        } else {
          swal("No bookings available", {
            timer: 2000,
          });
        }
      } catch (error) {
        swal("Error deleting bookings", { icon: "error" });
      }
    }
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
