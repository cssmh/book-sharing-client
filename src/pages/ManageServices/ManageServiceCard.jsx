import { Link } from "react-router-dom";
import swal from "sweetalert";

const ManageServiceCard = ({ service, services, setServices }) => {
  // console.log(service);
  const { _id, book_name, book_image, phone } = service;

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
        fetch(`https://book-sharing-server.vercel.app/services/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              const remaining = services.filter((book) => book._id !== _id);
              setServices(remaining);
              swal(`${name} deleted!`, {
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
      <div className="card  bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={book_image} alt="Shoes" className="rounded-xl h-52" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title font-bold text-blue-900">{book_name}</h2>

          <p className="text-lg font-bold mb-4">Phone: {phone}</p>
          <div className="card-actions">
            <Link to={`/updateservice/${_id}`}>
              <button className="btn btn-outline">Update Product</button>
            </Link>
            <button
              onClick={() => handleDelete(_id, book_name)}
              className="btn btn-outline"
            >
              delete product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageServiceCard;
