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
            <div className="mask w-16 rounded-sm">
              <img src={book_image} alt="no image" />
            </div>
          </div>
        </div>
      </th>
      <td className="text-sm py-3 px-4">
        <p>{book_name}</p>
      </td>
      <td className="text-sm py-3 px-4">
        <p>{provider_name}</p>
      </td>
      <td className="text-sm py-3 px-4">{provider_location}</td>
      <td className="text-sm py-3 px-4">
        <p
          className={
            book_status === "available" ? "text-green-400" : "text-red-400"
          }
        >
          {book_status}
        </p>
      </td>
      <td className="py-3 px-4">
        <Link
          to={`/book/${book_name.toLowerCase().replaceAll(/\s+/g, "_")}/${_id}`}
        >
          <button className="rounded-md text-sm  px-2 py-1 bg-green-600 text-white transform active:translate-y-0.5 transition-transform duration-150 ease-in-out">
            Details
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AdminBooksRow;
