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
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div data-aos="zoom-in" className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={book_image}
          alt="book"
          className="rounded-xl w-1/2 lg:h-[270px] mt-5"
        />
      </figure>
      <div>
        <h2 className="text-2xl text-blue-900 text-center">{book_name}</h2>
        <h1 className="text-xl text-center">Collector Info: </h1>
        <div className="mb-2 text-lg w-2/3 mx-auto">
          <p className="text-green-500">Phone: {buyerPhone}</p>
          <p className="text-yellow-700">Email: {user_email}</p>
          <p>Message: {instruction}</p>
          <p>
            Need Book by: <span className="text-blue-500">{date}</span>
          </p>
        </div>
        <div className="text-center mb-4">
          <select
            id="book"
            name="book_name"
            defaultValue={status}
            onChange={() => handleStatus(event, _id)}
            className="input input-bordered"
          >
            <option value="Pending">
              <button className="btn btn-primary">Pending</button>
            </option>
            <option value="Progress">
              <button className="btn btn-primary">Progress</button>
            </option>
            <option value="Completed">
              <button className="btn btn-primary">Completed</button>
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyPendingCard;
