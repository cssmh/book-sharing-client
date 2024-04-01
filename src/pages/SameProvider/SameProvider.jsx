import { useParams } from "react-router-dom";
import SameProviderCard from "./SameProviderCard";
import { HashLoader } from "react-spinners";
import useMyBooksCustomHook from "../../useCustomHook/useMyBooksCustomHook";

const SameProvider = () => {
  const getUser = useParams();
  
  const url = `/myBooks?email=${getUser?.email}`;
  const { isLoading, providerBook } = useMyBooksCustomHook(url);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-[70vh] mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <>
          <p className="my-4 text-center font-semibold text-2xl">
            Total {providerBook?.length} Books
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {providerBook?.map((soloBook) => (
              <SameProviderCard
                key={soloBook._id}
                getBooks={soloBook}
              ></SameProviderCard>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SameProvider;
