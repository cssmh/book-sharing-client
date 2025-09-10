import swal from "sweetalert";
import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { deleteBook } from "../Api/Delete";

const AdminBooksRow = ({ getBooks, refetch }) => {
  const { user } = useAuth();
  const {
    _id,
    book_name,
    book_image,
    provider_name,
    provider_location,
    book_status,
  } = getBooks;

  const handleDeleteByAdmin = async (idx, book) => {
    try {
      const willDelete = await swal({
        title: "Are you sure?",
        text: "Once deleted, it can't be recovered!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (willDelete) {
        const res = await deleteBook(idx, user?.email);
        if (res.deletedCount > 0) {
          swal(`${book} Deleted!`, {
            icon: "success",
            timer: 2000,
          });
          refetch();
        }
      }
    } catch (error) {
      swal(error?.response?.data?.message, {
        icon: "error",
        timer: 3000,
      });
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200">
      <td className="py-3 px-4">
        <div className="flex gap-4 items-center">
          <button
            onClick={() => handleDeleteByAdmin(_id, book_name)}
            className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
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
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={book_image}
              alt={book_name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </td>
      <td className="text-sm py-3 px-4 text-gray-800 font-medium">
        {book_name}
      </td>
      <td className="text-sm py-3 px-4 text-gray-700">{provider_name}</td>
      <td className="text-sm py-3 px-4 text-gray-700">{provider_location}</td>
      <td className="text-sm py-3 px-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            book_status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {book_status.toUpperCase()}
        </span>
      </td>
      <td className="py-3 px-4">
        <Link
          to={`/book/${book_name.toLowerCase().replaceAll(/\s+/g, "_")}/${_id}`}
        >
          <button className="rounded-full text-sm px-4 py-2 bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors duration-200">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AdminBooksRow;
