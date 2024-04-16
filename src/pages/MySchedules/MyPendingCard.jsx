import swal from "sweetalert";
import useAxiosHook from "../../useCustomHook/useAxiosHook";

const MyPendingCard = ({ getPending }) => {
  const { axiosNoToken } = useAxiosHook();
  // console.log(getPending);
  const {
    _id,
    book_image,
    book_name,
    buyerPhone,
    instruction,
    status,
    date,
    book_purchaser_email,
  } = getPending;

  const handleStatus = (event, _id) => {
    // console.log(event.target.value, _id);
    const newStatus = event.target.value;
    const updatedStatus = { newStatus };
    axiosNoToken
      .put(`/bookings/${_id}`, updatedStatus)
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          swal("Thank You!", `Updated to ${newStatus}`, "success");
        }
      })
      .then();
  };

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-1/2 mx-auto my-3"
          />
        </figure>
        <h2 className="text-2xl text-blue-900 text-center mt-2 mb-1 px-2">
          {book_name}
        </h2>
        <h1 className="text-xl text-center">Collector Info: </h1>
        <div className="mb-2 text-lg w-2/3 mx-auto">
          <p className="text-green-500">Phone: {buyerPhone}</p>
          <p className="text-yellow-800">{book_purchaser_email}</p>
          {instruction.length > 0 && <p>Message: {instruction}</p>}
          <p>
            Need Book by: <span className="text-blue-500">{date}</span>
          </p>
        </div>
      </div>
      <div className="text-center mt-1">
        <select
          id="book"
          name="book_name"
          defaultValue={status}
          onChange={() => handleStatus(event, _id)}
          className="input input-bordered focus:border-transparent"
          style={{ outline: "none" }}
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
  );
};

export default MyPendingCard;
