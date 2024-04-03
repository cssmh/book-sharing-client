import { Link } from "react-router-dom";
import swal from "sweetalert";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";

const MyBooksCard = ({ getBook, myBooks, setMyBooks }) => {
  const { user } = useContextHook();
  const axiosCustom = useAxiosHook();
  const { _id, book_name, book_image, phone } = getBook;

  const handleDelete = (_id, name) => {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // main code
        axiosCustom.delete(`/books/${_id}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            const remaining = myBooks.filter((book) => book._id !== _id);
            setMyBooks(remaining);
            swal(`${name} Deleted!`, {
              icon: "success",
            });
          }
        });
      } else {
        swal("Your file is safe!");
      }
    });
  };
  // My Books page card

  return (
    <div data-aos="zoom-in" className="card bg-base-100 shadow-xl">
      <figure className="pt-6 mb-2">
        <img
          src={book_image}
          alt="book"
          className="rounded-xl w-[40%] md:w-1/2 lg:h-[270px]"
        />
      </figure>
      <div className="items-center text-center space-y-2 mb-5">
        <h2 className="text-2xl font-bold text-blue-900 px-4">{book_name}</h2>
        <p className="text-lg pb-1">Phone: {phone}</p>
        <div className="space-x-1">
          <Link to={`/book/${_id}`}>
            <button className="btn border-green-400 hover:border-green-400 bg-yellow-50 hover:bg-green-400 text-green-400 hover:text-white">
              Details
            </button>
          </Link>
          <Link to={`/update-book/${_id}`}>
            <button className="btn border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
              Update
            </button>
          </Link>
          <button
            onClick={() => handleDelete(_id, book_name)}
            className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
