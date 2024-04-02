import { useParams } from "react-router-dom";
import SameProviderCard from "./SameProviderCard";
import { HashLoader } from "react-spinners";
import useProviderBookHook from "../../useCustomHook/useProviderBookHook";

const SameProvider = () => {
  const getUser = useParams();

  // same provider book data getting
  const url = `/myBooks?email=${getUser?.email}`;
  const { isLoading, bookData } = useProviderBookHook(url);
  // if length is 0 or more than one books then
  // show Books plural form. Just a try
  const bookText =
    bookData?.length === 1 || bookData?.length === 0 ? "Book" : "Books";

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center min-h-[70vh] mt-5">
          <HashLoader color="#9933FF" size={36} />
        </div>
      ) : (
        <>
          <p className="my-4 text-center font-semibold text-2xl">
            Total {bookData?.length} {bookText}
          </p>
          <div className="max-w-7xl mx-auto gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {bookData?.map((soloBook) => (
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
