import { Link } from "react-router-dom";
import swal from "sweetalert";

const MyBooksCard = ({ getBook, myBooks, setMyBooks }) => {
  // console.log(service);
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
        fetch(`http://localhost:5000/books/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
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
    <div>
      <div data-aos="zoom-in" className="card bg-base-100 shadow-xl">
        <figure className="pt-6 mb-2">
          <img
            src={book_image}
            alt="book"
            className="rounded-xl w-1/2 lg:h-[270px]"
          />
        </figure>
        <div className="items-center text-center space-y-2 mb-5">
          <h2 className="text-[22px] font-bold text-blue-900">{book_name}</h2>
          <p className="text-lg">Phone: {phone}</p>
          <div className="space-x-1">
            <Link to={`/update-book/${_id}`}>
              <button className="btn border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
                Update Product
              </button>
            </Link>
            <button
              onClick={() => handleDelete(_id, book_name)}
              className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
            >
              delete product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
