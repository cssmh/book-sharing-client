import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllBooksRow = ({ getBooks, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    book_name,
    book_image,
    book_provider_name,
    provider_location,
    book_status,
  } = getBooks;

  const handleDeleteByAdmin = (idx, book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/book/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              text: `${book} Deleted!`,
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr>
      <th>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleDeleteByAdmin(_id, book_name)}
            className="btn btn-sm btn-circle btn-outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="avatar">
            <div className="mask w-16 rounded-sm">
              <img src={book_image} alt="no image" />
            </div>
          </div>
        </div>
      </th>
      <td>
        <p>{book_name}</p>
      </td>
      <td>
        <p>{book_provider_name}</p>
      </td>
      <td>{provider_location}</td>
      <td>
        <p
          className={
            book_status === "available" ? "text-green-400" : "text-red-400"
          }
        >
          {book_status}
        </p>
      </td>
      <td>
        <Link to={`/book/${_id}`}>
          <button className="rounded-md p-1 bg-green-400 text-white">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AllBooksRow;
