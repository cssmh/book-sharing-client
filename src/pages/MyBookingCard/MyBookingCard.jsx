import swal from "sweetalert";
import useAxiosPublic from "../../useCustomHook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const MyBookingCard = ({ getBooking, refetch }) => {
  const axiosNoToken = useAxiosPublic()

  const {
    _id,
    book_id,
    book_name,
    book_image,
    book_provider_email,
    book_provider_phone,
    user_date,
    status,
    completed_at,
  } = getBooking;

  const handleBookingDelete = (idx, name) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete){ 
        axiosNoToken.delete(`/booking/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            refetch();
            swal(`Booking on ${name} Deleted!`, {
              icon: "success",
            });
          }
        });
      }
    });
  };

  const { data: available = "" } = useQuery({
    queryKey: ["available", book_id],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/book/${book_id}`);
      return res?.data?.book_status;
    },
  });

  return (
    <div
      data-aos="zoom-in"
      className="bg-base-100 shadow-xl rounded-xl px-14 pt-2 md:pt-3 py-6 flex flex-col"
    >
      <div className="flex-grow">
        <figure>
          <img
            src={book_image}
            onContextMenu={(e) => e.preventDefault()}
            className="rounded-xl w-[60%] mx-auto my-2"
          />
        </figure>
        <p className="text-2xl">{book_name}</p>
        <div className="text-lg">
          <p className="text-xl">Provider Information</p>
          <p className="text-green-600">{book_provider_phone}</p>
          <p className="text-purple-800">{book_provider_email}</p>
          {available === "Unavailable" && status !== "Completed" ? (
            <p className="text-red-700">Sorry, taken by someone else!</p>
          ) : (
            <p>
              Status:{" "}
              <span
                className={
                  status === "Pending"
                    ? "text-red-500"
                    : status === "Completed"
                    ? "text-green-500"
                    : "text-blue-500"
                }
              >
                {status}
              </span>
            </p>
          )}
          <p>Booked: {user_date}</p>
          {completed_at && (
            <p>
              Completed: <span className="text-cyan-500">{completed_at}</span>
            </p>
          )}
        </div>
      </div>
      {status !== "Completed" && (
        <div className="mt-2 card-actions justify-center">
          <button
            onClick={() => handleBookingDelete(_id, book_name)}
            className="btn border-black bg-base-100 hover:bg-black text-black hover:text-white"
          >
            Delete Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBookingCard;
