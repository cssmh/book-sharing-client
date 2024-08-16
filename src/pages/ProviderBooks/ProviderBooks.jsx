import { useParams } from "react-router-dom";
import SkeletonCard from "../../Components/AllSkeleton/SkeletonCard";
import AllBooksCard from "../AllBooksCard/AllBooksCard";
import { Helmet } from "react-helmet-async";
import useMyBooks from "../../Hooks/useMyBooks";

const ProviderBooks = () => {
  const { email } = useParams();
  const url = `/my-books?email=${email}`;
  const { isLoading, bookData: sameProvider = [], error } = useMyBooks(url);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-4">Failed to load books.</div>
    );
  }
  const bookText = sameProvider?.length === 1 ? "Book" : "Books";

  return (
    <div className="mb-8">
      <Helmet>
        <title>BookHaven | Providers Books</title>
      </Helmet>
      <p className="my-4 text-center font-semibold text-2xl">
        Total {sameProvider?.length} {bookText}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {sameProvider?.map((book) => (
          <AllBooksCard key={book._id} getBook={book} />
        ))}
      </div>
    </div>
  );
};

export default ProviderBooks;
