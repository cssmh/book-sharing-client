import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MakeBooksAvailable = () => {
  const axiosSecure = useAxiosSecure();
  const handleMakeBooksAvailable = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You're making all books available",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .put("/available-all-books")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              Swal.fire({
                text: "all books are now available",
                icon: "success",
              });
            } else {
              Swal.fire({
                text: "already available",
              });
            }
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <button
      onClick={handleMakeBooksAvailable}
      className="bg-green-500 px-3 py-[6px] rounded-md text-white"
    >
      Make all Books Available
    </button>
  );
};

export default MakeBooksAvailable;
