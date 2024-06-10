import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { Helmet } from "react-helmet-async";
import AddBooking from "../AddBooking/AddBooking";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useMyBooks from "../../Hooks/useMyBooks";

const BookDetails = () => {
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosNoToken = useAxiosPublic();

  const {
    data: loadBookData = [],
    isLoading: bookDataLoading,
    refetch,
  } = useQuery({
    queryKey: ["loadBookData", id],
    queryFn: async () => {
      const res = await axiosNoToken.get(`/book/${id}`);
      return res?.data;
    },
  });

  const {
    _id,
    book_name,
    book_image,
    book_provider_name,
    book_provider_email,
    book_provider_image,
    book_provider_phone,
    provider_location,
    description,
    book_status,
    user_name,
    user_review,
  } = loadBookData;

  const url = `/my-books?email=${book_provider_email}`;
  const { isLoading, bookData } = useMyBooks(url);

  const handleDeleteByAdmin = (idx, book) => {
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
            swal(`${book} Deleted!`, {
              icon: "success",
            });
          }
          navigateTo(-1);
        });
      }
    });
  }

  if (isLoading || bookDataLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#9933FF" size={32} />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{book_name}</title>
      </Helmet>
      <div className="card max-w-xl mx-auto bg-amber-100 shadow-xl p-6 my-6">
        <h2 className="text-center font-bold text-3xl text-blue-800">
          Book Provider Information
        </h2>
        <figure className="px-10 pt-5">
          <img
            className="rounded-lg w-24 md:w-28"
            src={book_provider_image}
            onContextMenu={(e) => e.preventDefault()}
            alt="no image"
          />
        </figure>
        <div className="card-body items-center text-center p-4 pb-0">
          <h2 className="card-title text-xl text-orange-500 font-bold">
            Name : {book_provider_name}
          </h2>
          <p className="text-lg font-medium">Email: {book_provider_email}</p>
          <p className="text-lg font-medium">
            Location: <span className="text-blue-500">{provider_location}</span>
          </p>
          <p className="text-lg font-medium">
            Phone: <span className="text-green-500">{book_provider_phone}</span>
          </p>
        </div>
        <div className="flex justify-center mt-2">
          {bookData?.length > 1 && book_provider_email !== user?.email && (
            <Link to={`/provider/${book_provider_email}`}>
              <button className="btn btn-sm rounded-lg btn-success text-white mt-1">
                More Books Of {book_provider_name}
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-7 py-8">
        <div className="flex-1">
          <figure>
            <img
              src={book_image}
              onContextMenu={(e) => e.preventDefault()}
              className="rounded-xl w-[170px] lg:w-[263px] mx-auto lg:mx-0 lg:ml-auto"
            />
          </figure>
        </div>
        <div className="flex-1 space-y-1 text-center lg:text-left">
          <h2 className="text-2xl font-bold text-blue-900 lg:w-[90%] mx-3 md:mx-0">
            {book_name}
          </h2>
          <div className="mx-4 lg:mx-0 md:w-[80%] lg:w-[90%] md:mx-auto">
            {description.length < 720 ? (
              description
            ) : (
              <>
                {description.slice(0, 720)}
                <button
                  className="btn btn-sm rounded-lg"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  Read more...
                </button>
                <dialog id="my_modal_4" className="modal">
                  <div className="modal-box w-11/12 max-w-5xl">
                    <div className="modal-action mt-0">
                      <form method="dialog">
                        <button className="btn btn-primary text-white btn-sm rounded-lg">
                          close
                        </button>
                      </form>
                    </div>
                    <p className="py-1">{description}</p>
                  </div>
                </dialog>
              </>
            )}
          </div>
          {book_provider_email !== user?.email &&
            book_status === "available" && (
              <AddBooking getBookData={loadBookData}></AddBooking>
            )}
          {book_provider_email === user?.email &&
            book_status === "Unavailable" && (
              <p className="text-green-600">You shared this book.</p>
            )}
          {book_provider_email !== user?.email &&
            book_status === "Unavailable" && (
              <p className="text-lg text-red-600">Unavailable to Collect..</p>
            )}
          <div>
            {book_status === "available" &&
              book_provider_email === user?.email && (
                <Link to={`/update-book/${_id}`}>
                  <button className="text-white bg-primary  font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mt-1 mx-2 md:mx-0">
                    Update This Book
                  </button>
                </Link>
              )}
          </div>
          {book_status === "available" && user?.email == "admin@admin.com" && (
            <button
              onClick={() => handleDeleteByAdmin(_id, book_name)}
              className="text-white bg-pink-500 font-medium rounded-lg text-sm px-4 py-2 text-center mx-2 md:mx-0"
            >
              Delete This Book
            </button>
          )}
        </div>
      </div>
      {user_review && (
        <div className="max-w-[1200px] mx-4 lg:mx-auto">
          <div className="flex gap-2 items-center relative">
            <p className="bg-green-400 px-3 py-2 text-white rounded-md mb-2 relative group">
              Collector Review
              <span className="absolute left-0 top-full mt-1 min-w-max bg-black text-white text-center rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {user_name}
              </span>
            </p>
          </div>
          <p>{user_review}</p>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
