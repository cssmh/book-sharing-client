import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import MyPendingCard from "../MyPendingCard/MyPendingCard";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Shared/useCustomHook/useAuth";
import useAxiosSecure from "../../Shared/useCustomHook/useAxiosSecure";
import useMyBooksHook from "../../Shared/useCustomHook/useMyBooksHook";

const MyPending = () => {
  const { user } = useAuth();
  const [completedBookIds, setCompletedBookIds] = useState([]);
  const axiosSecure = useAxiosSecure();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading: loading, bookData } = useMyBooksHook(url);
  // to show a message only

  useEffect(() => {
    axiosSecure.get(`/unavailable-ids?email=${user?.email}`).then((res) => {
      const bookIds = res?.data?.map((book) => book._id);
      setCompletedBookIds(bookIds);
    });
  }, [user?.email, axiosSecure]);

  const {
    isLoading,
    error,
    data: allMyPending,
  } = useQuery({
    queryKey: ["allMyPending", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-pending?email=${user?.email}`);
      return res?.data;
    },
    enabled: !!user?.email,
  });

  const handleComplete = (bookId) => {
    setCompletedBookIds([...completedBookIds, bookId]);
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center md:mt-[6px]">
        <FallingLines
          color="#9933FF"
          width="55"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
        An error occurred while fetching your Pending.
      </div>
    );
  }

  return (
    <div>
      {bookData.length == 0 ? (
        <p className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
          You have No added Books
        </p>
      ) : allMyPending?.length == 0 ? (
        <p className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
          No User Booked Your Books
        </p>
      ) : (
        <>
          <h2 className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold italic">
            User Booked Your Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {allMyPending?.map((pending) => (
              <MyPendingCard
                key={pending._id}
                getPending={pending}
                completedBookIds={completedBookIds}
                handleComplete={handleComplete}
              ></MyPendingCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyPending;
