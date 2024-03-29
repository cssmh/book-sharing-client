import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosHook from "../../useCustomHook/useAxiosHook";
import SameProviderCard from "./SameProviderCard";
import { HashLoader } from "react-spinners";

const SameProvider = () => {
  const getUser = useParams();
  const axiosCustom = useAxiosHook();
  const [thatUserBook, setThatUserBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = `/myBooks?email=${getUser?.email}`;
  useEffect(() => {
    axiosCustom?.get(url).then((res) => {
      setThatUserBook(res.data);
      setIsLoading(false);
    });
  }, [axiosCustom, url]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-[70vh] mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <div className="my-7">
          <p className="mb-6 text-center font-semibold text-2xl">
            Total {thatUserBook?.length} Books
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {thatUserBook?.map((soloBook) => (
              <SameProviderCard
                key={soloBook._id}
                getBooks={soloBook}
              ></SameProviderCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SameProvider;
