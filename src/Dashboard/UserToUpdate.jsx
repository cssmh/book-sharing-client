import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMyBooks from "../Hooks/useMyBooks";
import { Helmet } from "react-helmet-async";
import { ScaleLoader } from "react-spinners";

const UserToUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, bookData: emails, refetch } = useMyBooks("/emails");

  const handleDelete = (idx) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/email/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal({ text: "Email Deleted!", icon: "success", timer: 2000 });
            refetch();
          }
        });
      }
    });
  };

  const handleDeleteAll = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axiosSecure.delete(`/email/all`).then((res) => {
          if (res.data?.deletedCount > 0) {
            swal({
              text: "All Emails Deleted!",
              icon: "success",
              timer: 2000,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <Helmet>
        <title>BookHaven | User To Update</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-center mb-6">
        Users to Get Notified for New Books
      </h1>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <ScaleLoader size={100} color="#4F46E5" />
        </div>
      ) : (
        <div>
          {emails?.length > 0 && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
              >
                Delete All
              </button>
            </div>
          )}
          <ul className="space-y-4">
            {emails?.map((email, idx) => (
              <li
                key={email._id}
                className="flex items-center justify-between p-4 bg-gray-100 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-gray-800">{`${idx + 1}. ${email.email}`}</span>
                <button
                  onClick={() => handleDelete(email._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserToUpdate;
