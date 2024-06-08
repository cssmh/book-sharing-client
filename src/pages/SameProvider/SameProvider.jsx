import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import AllBooksCard from "../AllBooksCard/AllBooksCard";

const SameProvider = () => {
  const { email } = useParams();
  const axiosNoToken = useAxiosPublic();

  const { data: sameProvider, isLoading } = useQuery({
    queryKey: ["sameProvider", email],
    queryFn: async () => {
      const res = await axiosNoToken.get(`my-books?email=${email}`);
      return res?.data;
    },
  });

  const bookText =
    sameProvider?.length === 1 || sameProvider?.length === 0
      ? "Book"
      : "Books";

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <p className="my-4 text-center font-semibold text-2xl">
        Total {sameProvider?.length} {bookText}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* used AllBooksCard because of same data */}
        {sameProvider?.map((book) => (
          <AllBooksCard key={book._id} getBook={book}></AllBooksCard>
        ))}
      </div>
    </div>
  );
};

export default SameProvider;
