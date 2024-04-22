import MyPendingCard from "./MyPendingCard";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import useContextHook from "../../useCustomHook/useContextHook";
import useAxiosHook from "../../useCustomHook/useAxiosHook";

const MyPending = () => {
  const { user } = useContextHook();
  const [isLoading, setIsLoading] = useState(true);
  const [myPending, setMyPending] = useState([]);
  const { axiosSecure } = useAxiosHook();

  const url = `/pending?email=${user?.email}`;
  useEffect(() => {
    axiosSecure.get(url)?.then((res) => {
      setMyPending(res?.data);
      setIsLoading(false);
    });
  }, [axiosSecure, url]);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center md:mt-[6px]">
          <FallingLines
            color="#9933FF"
            width="55"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      ) : (
        <div>
          {myPending.length == 0 ? (
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
                  ></MyPendingCard>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyPending;
