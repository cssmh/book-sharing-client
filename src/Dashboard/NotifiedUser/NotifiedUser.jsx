import { HashLoader } from "react-spinners";
import swal from "sweetalert";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyBooks from "../../Hooks/useMyBooks";

const NotifiedUser = () => {
  const axiosSecure = useAxiosSecure();
  const { isLoading, bookData: emails, refetch } = useMyBooks("/emails");

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#00CC66" size={32} />
      </div>
    );
  }
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
            swal("Email Deleted!", {
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
  );
};

export default NotifiedUser;
