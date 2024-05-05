import { HashLoader } from "react-spinners";
import { useParams } from "react-router-dom";
import SameProviderCard from "../SameProviderCard/SameProviderCard";
import useProviderHook from "../../useCustomHook/useProviderHook";

const SameProvider = () => {
  const getUser = useParams();
  // same provider book data getting
  const url = `/my-books?email=${getUser?.email}`;
  const { isLoading, bookData } = useProviderHook(url);
  const bookText =
    bookData?.length === 1 || bookData?.length === 0 ? "Book" : "Books";

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center min-h-[70vh] mt-5">
          <HashLoader color="#9933FF" size={32} />
        </div>
      ) : (
        <>
          <p className="my-4 text-center font-semibold text-2xl">
            Total {bookData?.length} {bookText}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {bookData?.map((soloBook) => (
              <SameProviderCard
                key={soloBook._id}
                getBooks={soloBook}
              ></SameProviderCard>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SameProvider;
