import { useParams } from "react-router-dom";
import SameProviderCard from "../SameProviderCard/SameProviderCard";
import { HashLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../useCustomHook/useAxiosPublic";

const SameProvider = () => {
  const { email } = useParams();
  const axiosNoToken = useAxiosPublic()

  const { data: loadSameProvider, isLoading } = useQuery({
    queryKey: ["loadSameProvider", email],
    queryFn: async () => {
      const res = await axiosNoToken.get(`my-books?email=${email}`);
      return res?.data;
    },
  });

  const bookText =
    loadSameProvider?.length === 1 || loadSameProvider?.length === 0
      ? "Book"
      : "Books";

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        <HashLoader color="#9933FF" size={32} />
      </div>
    );
  }

  return (
    <div>
      <p className="my-4 text-center font-semibold text-2xl">
        Total {loadSameProvider?.length} {bookText}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {loadSameProvider?.map((book) => (
          <SameProviderCard key={book._id} getBooks={book}></SameProviderCard>
        ))}
      </div>
    </div>
  );
};

export default SameProvider;
