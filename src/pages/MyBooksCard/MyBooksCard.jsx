import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyBooksCard = ({ getBook, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    _id,
    book_name,
    book_image,
    provider_phone,
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
        axiosSecure.delete(`/book/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal(`${name} Deleted!`, {
              icon: "success",
              timer: 2000,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="card bg-white shadow-md border border-gray-200 rounded-lg flex flex-col items-center text-center space-y-4 p-4 mb-5 transition-transform transform hover:scale-105">
      <figure className="mb-2">
        <img
          src={book_image}
          alt={book_name}
          onContextMenu={(e) => e.preventDefault()}
          className="rounded-md w-24 h-32 object-cover"
        />
      </figure>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-gray-900">{book_name}</h2>
        <p className="text-sm text-gray-600">Provider Phone: {provider_phone}</p>
        <p className="text-sm text-gray-600">Location: {provider_location}</p>
        <p className={`text-sm font-medium ${book_status === "available" ? "text-green-600" : "text-red-600"}`}>
          Book Status: {book_status}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link to={`/book/${_id}`}>
          <button className="bg-primary text-white hover:bg-primary-dark transition duration-300 ease-in-out rounded-md text-sm px-4 py-2">
            Details
          </button>
        </Link>
        {book_status === "available" && (
          <>
            <Link to={`/update-book/${_id}`}>
              <button className="bg-yellow-500 text-white hover:bg-yellow-600 transition duration-300 ease-in-out rounded-md text-sm px-4 py-2">
                Update
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id, book_name)}
              className="bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out rounded-md text-sm px-4 py-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyBooksCard;
