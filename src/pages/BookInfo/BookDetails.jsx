import { Link, useLoaderData, useNavigate } from "react-router-dom";
import AddBookings from "./AddBookings";
import { Helmet } from "react-helmet-async";
import swal from "sweetalert";
import useContextHook from "../../useCustomHook/useContextHook";
import { useEffect, useState } from "react";
import axios from "axios";
import { HashLoader } from "react-spinners";

const BookDetails = () => {
  const { user } = useContextHook();
  const bookData = useLoaderData();
  const navigateTo = useNavigate();
  const [providerBook, setProviderBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    _id,
    book_image,
    book_name,
    description,
    location,
    book_provider_image,
    book_provider_email,
    book_provider_name,
    phone,
  } = bookData;

  // for same provider book button length
  useEffect(() => {
    axios
      .get(`https://book-sharing-server.vercel.app/allbooks?email=${book_provider_email}`)
      .then((res) => {
        setProviderBook(res.data.result);
        setIsLoading(false);
      });
  }, [book_provider_email]);
  // for same provider book button length end

  const handleDelete = (_id) => {
    swal({
      title: "Check again if you want!",
      text: "Delete Confirm?",
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
              swal("Book Deleted!", {
                icon: "success",
              });
            }
            navigateTo(-1);
          });
      } else {
        swal("File is safe!");
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>{book_name}</title>
      </Helmet>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <div>
          <div className="card max-w-xl mx-auto bg-amber-100 shadow-xl p-6 my-6">
            <h2 className="text-center font-bold text-3xl italic text-blue-800">
              Book Provider Information
            </h2>
            <figure className="px-10 pt-7">
              <img
                className="rounded-xl w-24"
                src={book_provider_image}
                alt="no image"
              />
            </figure>
            <div className="card-body items-center text-center p-5">
              <h2 className="card-title text-xl text-orange-500 font-bold">
                Name : {book_provider_name}
              </h2>
              <p className="text-lg font-medium">
                Email: {book_provider_email}
              </p>
              <p className="text-lg font-medium">
                Location: <span className="text-blue-500">{location}</span>
              </p>
              <p className="text-lg font-medium">
                Phone: <span className="text-green-600">{phone}</span>
              </p>
            </div>
          </div>
          <div className="card bg-yellow-50 shadow-xl">
            <figure className="px-10 pt-7">
              <img
                src={book_image}
                alt="book"
                className="rounded-xl w-[380px]"
              />
            </figure>
            <div className="card-body items-center text-center pt-0">
              <h2 className="card-title text-2xl font-bold text-blue-900 pt-5">
                {book_name}
              </h2>
              <p className="w-2/3 mx-auto">{description}</p>
              <div className="card-actions mt-2">
                <AddBookings getBookData={bookData}></AddBookings>
              </div>
              {providerBook.length > 1 && (
                <Link to={`/provider/${book_provider_email}`}>
                  <button className="btn btn-sm btn-success text-white mt-1">
                    Other Books Of {book_provider_name}
                  </button>
                </Link>
              )}
              {user?.email == "admin@admin.com" && (
                <button
                  onClick={() => handleDelete(_id)}
                  className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Delete {book_name}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
