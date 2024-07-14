import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMyBooks from "../Hooks/useMyBooks";
import { Helmet } from "react-helmet-async";

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
        // main code
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
    <div>
      <Helmet>
        <title>BookHaven | User To Update</title>
      </Helmet>
      <h1 className="text-center text-xl mb-6 mt-2 md:mt-0">
        All Users To Get Notified for New Books
      </h1>
      {isLoading ? (
        <div className="ml-4 space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex items-center animate-pulse">
              <span className="bg-gray-300 h-6 w-8 rounded mr-2"></span>
              <button className="w-full mr-4 md:w-1/2 bg-gray-300 h-7 rounded-lg px-4"></button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            {emails?.length > 1 && (
              <button
                onClick={handleDeleteAll}
                className="btn btn-sm rounded-lg px-3 btn-secondary"
              >
                Delete all
              </button>
            )}
          </div>
          <div className="ml-4 space-y-1">
            {emails?.map((email, idx) => (
              <div key={email._id}>
                {idx + 1}.{" "}
                <button
                  onClick={() => handleDelete(email._id)}
                  className="btn btn-sm rounded-lg px-3 btn-secondary"
                >
                  {email.email}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserToUpdate;
