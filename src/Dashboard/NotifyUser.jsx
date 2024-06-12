import swal from "sweetalert";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useMyBooks from "../Hooks/useMyBooks";
import SmallLoader from "../Components/AllLoader/SmallLoader";

const NotifyUser = () => {
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
      <h1 className="text-center text-xl mb-6">
        All Users To Get Notified for New Books
      </h1>
      {isLoading ? (
        <SmallLoader />
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

export default NotifyUser;
