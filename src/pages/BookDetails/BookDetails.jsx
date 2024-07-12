import swal from "sweetalert";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import AddBooking from "../AddBooking/AddBooking";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyBooks from "../../Hooks/useMyBooks";
import SmallLoader from "../../Components/AllLoader/SmallLoader";
import useQueryPublic from "../../Hooks/useQueryPublic";
import { useState } from "react";

const BookDetails = () => {
  const [desc, setDesc] = useState(true);
  const { user } = useAuth();
  const navigateTo = useNavigate();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: loadBookData = {},
    isLoading: bookDataLoading,
    refetch,
  } = useQueryPublic(["loadBookData", id], `/book/${id}`);

  const url = `/my-books?email=${loadBookData?.provider_email}`;
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
        axiosSecure.delete(`/book/${idx}/${user?.email}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal(`${book} Deleted!`, { icon: "success", timer: 2000 });
            refetch();
            navigateTo(-1);
          }
        });
      }
    });
  };

  if (isLoading || bookDataLoading) {
    return <SmallLoader />;
  }

  const {
    _id,
    book_name,
    book_image,
    provider_name,
    provider_email,
    provider_image,
    provider_phone,
    provider_location,
    description,
    added_time,
    book_status,
    user_name,
    user_review,
  } = loadBookData;

  return (
    <div>
      <Helmet>
        <title>BookHaven | {book_name}</title>
      </Helmet>
      <div className="card max-w-xl mx-auto bg-gradient-to-r from-yellow-100 to-amber-100 shadow-xl p-6 mt-2 md:mt-4">
        <h2 className="text-center font-bold text-xl md:text-[22px] text-blue-800 italic">
          Book Provider Information
        </h2>
        <figure className="flex justify-center my-2">
          <img
            className="rounded-full w-24 shadow-xl"
            src={provider_image}
            onContextMenu={(e) => e.preventDefault()}
            alt="Provider"
          />
        </figure>
        <div className="text-center text-lg">
          <h3 className="text-orange-500 font-bold">{provider_name}</h3>
          <p className="text-gray-700">Email: {provider_email}</p>
          <p className="text-green-500">Phone:{provider_phone}</p>
          <p className="text-lg font-medium">
            Location: <span className="text-blue-500">{provider_location}</span>
          </p>
        </div>
        {bookData?.length > 1 && provider_email !== user?.email && (
          <div className="text-center mt-4">
            <Link to={`/provider/${provider_email}`}>
              <button className="btn btn-sm rounded-full btn-success text-white">
                More Books of {provider_name}
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-7 py-8">
        <div className="flex-1">
          <figure>
            <img
              src={book_image}
              onContextMenu={(e) => e.preventDefault()}
              className="rounded-xl w-[140px] lg:w-[250px] mx-auto lg:mx-0 lg:ml-auto"
            />
          </figure>
        </div>
        <div className="flex-1 space-y-1 text-center lg:text-left">
          <h2 className="text-[21px] font-bold text-blue-900 lg:w-[80%] mx-3 md:mx-0">
            {book_name}
          </h2>
          <p className="font-semibold">
            Added: <span className="text-blue-600">{added_time}</span>
          </p>
          {provider_email !== user?.email && book_status === "available" && (
            <AddBooking getBookData={loadBookData} />
          )}
          {provider_email === user?.email && book_status === "Unavailable" && (
            <p className="text-green-600">You shared this book.</p>
          )}
          {provider_email !== user?.email && book_status === "Unavailable" && (
            <p className="text-lg text-red-600">Unavailable to Collect..</p>
          )}
          <p>
            {book_status === "available" && provider_email === user?.email && (
              <Link to={`/update-book/${_id}`}>
                <button className="text-white bg-primary font-medium rounded-lg text-sm px-4 py-2 text-center me-2 mt-1 mx-2 md:mx-0">
                  Update This Book
                </button>
              </Link>
            )}
          </p>
          <p>
            {book_status === "available" &&
              user?.email === "admin@admin.com" && (
                <button
                  onClick={() => handleDeleteByAdmin(_id, book_name)}
                  className="text-white bg-pink-500 font-medium rounded-lg text-sm px-4 py-2 text-center mx-2 md:mx-0"
                >
                  Delete This Book
                </button>
              )}
          </p>
        </div>
      </div>
      <div className="max-w-[1200px] mx-4 lg:mx-auto mb-8">
        <div className="flex gap-1">
          <button
            onClick={() => setDesc(true)}
            className="bg-blue-500 px-3 py-2 text-white rounded-md mb-2"
          >
            Description
          </button>
          {user_review && (
            <button
              onClick={() => setDesc(false)}
              className="bg-green-500 px-3 py-2 text-white rounded-md mb-2"
            >
              Collector Review
            </button>
          )}
        </div>
        {desc ? (
          <p>{description}</p>
        ) : (
          <p>
            <span className="font-semibold">{user_name}</span> - {user_review}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
