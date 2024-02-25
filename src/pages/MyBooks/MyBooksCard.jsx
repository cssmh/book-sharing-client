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
        fetch(`https://book-sharing-server.vercel.app/books/${_id}`, {
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
      <div className="card h-auto md:h-[500px] bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-xl mx-2 md:mx-4">
        <figure className="px-10 pt-6">
          <img
            src={book_image}
            alt="book"
            className="rounded-xl h-80 md:h-64"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
          <p className="text-lg font-bold mb-4">Phone: {phone}</p>
          <div className="card-actions">
            <Link to={`/update-book/${_id}`}>
              <button className="btn border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">Update Product</button>
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
