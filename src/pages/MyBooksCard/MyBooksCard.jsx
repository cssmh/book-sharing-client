import swal from "sweetalert";
import { Link } from "react-router-dom";
import useAuth from "../../useCustomHook/useAuth";
import useAxiosSecure from "../../useCustomHook/useAxiosSecure";

const MyBooksCard = ({ getBook, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    book_name,
    book_image,
    book_provider_phone,
    book_status,
    provider_location,
  } = getBook;

  const handleDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axiosSecure.delete(`/book/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            swal(`${name} Deleted!`, {
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div
      data-aos="zoom-in"
      className="card bg-base-100 shadow-xl flex flex-col items-center text-center space-y-2 mb-5"
    >
      <div className="flex-grow">
        <figure className="pt-4 mb-2">
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[28%] md:w-[35%]"
          />
        </figure>
        <h2 className="text-xl md:text-2xl font-bold text-blue-900 px-4">
          {book_name}
        </h2>
        <p className="text-lg">Phone: {book_provider_phone}</p>
        <p className="text-lg">Location: {provider_location}</p>
        <p>
          Book Status:{" "}
          <span
            className={`text-lg ${
              book_status === "available" ? "text-green-500" : "text-red-500"
            }`}
          >
            {book_status}
          </span>
        </p>
      </div>
      <div className="pb-5">
        <div className="space-x-1">
          <Link to={`/book/${_id}`}>
            <button className="btn border-green-400 hover:border-green-400 bg-yellow-50 hover:bg-green-400 text-green-400 hover:text-white">
              Details
            </button>
          </Link>
          {book_status === "available" && (
            <Link to={`/update-book/${_id}`}>
              <button className="btn border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
                Update
              </button>
            </Link>
          )}
          {book_status === "available" && (
            <button
              onClick={() => handleDelete(_id, book_name)}
              className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
            >
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
