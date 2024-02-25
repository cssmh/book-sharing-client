import axios from "axios";
import swal from "sweetalert";

const MyPendingCard = ({ getPending }) => {
  // console.log(getPending);
  const {
    _id,
    book_image,
    book_name,
    buyerPhone,
    instruction,
    status,
    date,
    user_email,
  } = getPending;

  const handleStatus = (event, _id) => {
    // console.log(event.target.value, _id);
    const newStatus = event.target.value;
    const updatedStatus = { newStatus };
    axios
      .put(`https://book-sharing-server.vercel.app/bookings/${_id}`, updatedStatus)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          swal("Good job!", `Updated to ${newStatus}`, "success");
        }
      })
      .then((err) => console.log(err));
  };
  // My pending page card

  return (
    <div className="card bg-yellow-50 hover:border hover:border-blue-700 hover:bg-yellow-50 shadow-lg mx-2 md:mx-4">
      <figure className="px-10 pt-10">
        <img
          src={book_image}
          alt="no images available"
          className="rounded-xl h-72 md:h-64"
        />
      </figure>
      <div>
        <h2 className="text-[22px] font-bold text-blue-900 text-center">
          {book_name}
        </h2>
        <p className="text-lg font-bold text-center mt-1">Collector Info: </p>
        <div className="flex border border-green-400 p-2 my-3 mx-6 rounded-md gap-1">
          <div>
            <p>Phone: {buyerPhone}</p>
            <p>Email: {user_email}</p>
          </div>
          <div>
            <p>Message: {instruction}</p>
            <p>Need Book by: {date}</p>
          </div>
        </div>
        <div className="text-center mb-4">
          <select
            id="cars"
            name="book_name"
            defaultValue={status}
            onChange={() => handleStatus(event, _id)}
            className="input input-bordered"
          >
            <option value="pending">
              <button className="btn btn-primary">Pending</button>
            </option>
            <option value="progress">
              <button className="btn btn-primary">Progress</button>
            </option>
            <option value="completed">
              <button className="btn btn-primary">Completed</button>
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyPendingCard;
