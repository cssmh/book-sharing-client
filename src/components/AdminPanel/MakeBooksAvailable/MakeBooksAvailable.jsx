import swal from "sweetalert";
import useAxiosHook from "../../../useCustomHook/useAxiosHook";
import toast from "react-hot-toast";

const MakeBooksAvailable = () => {
  const { axiosSecure } = useAxiosHook();
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
          .put("/allBooksAvailable")
          .then((res) => {
            if (res.data?.modifiedCount > 0) {
              swal("All books are now available", {
                icon: "success",
              });
            }
          })
          .catch((err) => toast.error(err));
      } else {
        swal("All books are safe to make available");
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
