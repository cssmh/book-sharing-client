import swal from "sweetalert";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Shared/useCustomHook/useAxiosSecure";

const MakeBooksAvailable = () => {
  const axiosSecure = useAxiosSecure();
  const handleMakeBooksAvailable = () => {
    swal({
      title: "Are you sure?",
      text: "You're making all books available",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure
          .put("/available-all-books")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              swal("all books are now available", {
                icon: "success",
              });
            } else {
              swal("already available");
            }
          })
          .catch((err) => toast.error(err));
      }
    });
  };

  return (
    <button
      onClick={handleMakeBooksAvailable}
      className="bg-green-400 px-3 py-[6px] rounded-md text-white"
    >
      Make all Books Available
    </button>
  );
};

export default MakeBooksAvailable;
