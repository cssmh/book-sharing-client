import { HashLoader } from "react-spinners";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyBooks from "../../Hooks/useMyBooks";

const NotifiedUser = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, bookData: emails, refetch } = useMyBooks("/emails");

  const handleDelete = (idx) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/email/${idx}`).then((res) => {
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              text: "Email Deleted!",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleDeleteAll = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/email/all`).then((res) => {
          if (res.data?.deletedCount > 0) {
            Swal.fire({
              text: "All Emails Deleted!",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-xl mb-6">
        All Users To Get Notified for New Books
      </h1>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#00CC66" size={32} />
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <button
              onClick={handleDeleteAll}
              className="btn btn-sm rounded-lg px-3 btn-secondary"
            >
              Delete all
            </button>
          </div>
          <div className="ml-4 space-y-1">
            {emails.map((email, idx) => (
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

export default NotifiedUser;
