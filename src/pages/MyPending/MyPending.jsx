import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import MyPendingCard from "../MyPendingCard/MyPendingCard";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import { useQuery } from "@tanstack/react-query";

const MyPending = () => {
  const { user } = useContextHook();
  const [completedBookIds, setCompletedBookIds] = useState([]);
  const { axiosSecure } = useAxiosHook();

  useEffect(() => {
    axiosSecure.get(`/unavailable-ids?email=${user?.email}`).then((res) => {
      const bookIds = res?.data?.map((book) => book._id);
      setCompletedBookIds(bookIds);
    });
  }, [user?.email, axiosSecure]);

  const getMyPending = async () => {
    const res = await axiosSecure.get(`/my-pending?email=${user?.email}`);
    return res?.data;
  };

  const {
    isLoading,
    error,
    data: myPending,
  } = useQuery({
    queryKey: ["myPending", user?.email],
    queryFn: getMyPending,
    enabled: !!user?.email, // Ensure the query runs only when the email is available
  });

  const handleComplete = (bookId) => {
    setCompletedBookIds([...completedBookIds, bookId]);
  };

  if (isLoading) {
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
      {myPending?.length == 0 ? (
        <p className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold text-red-600 italic">
          No User Booked Your Books
        </p>
      ) : (
        <>
          <h2 className="text-center text-lg md:text-2xl my-2 md:my-4 font-semibold italic">
            User Booked Your Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {myPending.map((pending) => (
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
