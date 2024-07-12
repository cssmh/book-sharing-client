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
        // main code
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
    <div
      data-aos="zoom-in"
      className="card bg-base-100 shadow-xl flex flex-col items-center text-center space-y-2 mb-5"
    >
      <div className="flex-grow">
        <figure className="pt-4 mb-2">
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[100px] h-[130px]"
          />
        </figure>
        <h2 className="md:text-lg font-bold text-blue-900 px-4">{book_name}</h2>
        <p className="text-base">Phone: {provider_phone}</p>
        <p className="text-base">Location: {provider_location}</p>
        <p>
          Book Status:{" "}
          <span
            className={`text-base ${
              book_status === "available" ? "text-green-500" : "text-red-600"
            }`}
          >
            {book_status}
          </span>
        </p>
      </div>
      <div className="pb-5">
        <div className="space-x-1">
          <Link to={`/book/${_id}`}>
            <button className="text-primary border border-primary hover:bg-primary hover:text-white transition duration-300 ease-in-out rounded-3xl text-sm px-4 py-2.5 text-center font-bold uppercase">
              Details
            </button>
          </Link>
          {book_status === "available" && (
            <>
              <Link to={`/update-book/${_id}`}>
                <button className="text-primary border border-primary hover:bg-primary hover:text-white transition duration-300 ease-in-out rounded-3xl text-sm px-4 py-2.5 text-center font-bold uppercase">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDelete(_id, book_name)}
                className="border border-black font-bold hover:bg-black hover:text-white transition duration-300 ease-in-out rounded-3xl text-sm px-4 py-2.5 text-center uppercase"
              >
                delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
