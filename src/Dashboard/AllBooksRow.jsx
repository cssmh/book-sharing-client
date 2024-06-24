import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AllBooksRow = ({ getBooks, refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    book_name,
    book_image,
    provider_name,
    provider_location,
    book_status,
  } = getBooks;

  const handleDeleteByAdmin = (idx, book) => {
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
            swal(`${book} Deleted!`, {
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
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <th className="py-3 px-4">
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
            <div className="mask w-16 h-16 rounded-sm">
              <img src={book_image} alt="no image" />
            </div>
          </div>
        </div>
      </th>
      <td className="py-3 px-4">
        <p>{book_name}</p>
      </td>
      <td className="py-3 px-4">
        <p>{provider_name}</p>
      </td>
      <td className="py-3 px-4">{provider_location}</td>
      <td className="py-3 px-4">
        <p
          className={
            book_status === "available" ? "text-green-400" : "text-red-400"
          }
        >
          {book_status}
        </p>
      </td>
      <td className="py-3 px-4">
        <Link to={`/book/${_id}`}>
          <button className="rounded-md p-2 bg-green-400 text-white">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AllBooksRow;
