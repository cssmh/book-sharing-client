import swal from "sweetalert";
import SmallLoader from "../Components/SmallLoader";
import { useQuery } from "@tanstack/react-query";
import { deleteAllEmails, deleteEmail } from "../Api/Delete";
import { getEmails } from "../Api/books";
import HavenHelmet from "../Components/HavenHelmet";

const UserToUpdate = () => {
  const {
    data: emails = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["emails"],
    queryFn: () => getEmails(),
  });

  const handleDelete = async (idx) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteEmail(idx);
      if (res.deletedCount > 0) {
        swal({ text: "Email Deleted!", icon: "success", timer: 2000 });
        refetch();
      }
    }
  };

  const handleDeleteAll = async () => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    });
    if (willDelete) {
      const res = await deleteAllEmails();
      if (res.deletedCount > 0) {
        swal({
          text: "All Emails Deleted!",
          icon: "success",
          timer: 2000,
        });
        refetch();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-2">
      <HavenHelmet title={"User To Update"} />
      <h1 className="text-xl font-semibold text-center mb-3">
        Users to Get Notified for New Books ({emails?.length})
      </h1>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <div className="space-y-6">
          {emails?.length > 0 && (
            <div className="flex justify-center mb-2">
              <button
                onClick={handleDeleteAll}
                className="bg-red-500 text-white py-1.5 px-4 rounded-lg shadow-md transition-colors duration-300 transform active:translate-y-0.5 ease-in-out"
              >
                Delete All
              </button>
            </div>
          )}
          <div className="flex flex-wrap justify-between">
            {emails?.map((email, idx) => (
              <div
                key={email._id}
                className={`w-full md:w-[49%] p-4 mb-4 bg-base-200 rounded-lg shadow-md transition-shadow duration-300 ${
                  idx % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{`${idx + 1}. ${
                    email.email
                  }`}</span>
                  <button
                    onClick={() => handleDelete(email._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg shadow-md hover:bg-red-600 transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserToUpdate;
