import { useLoaderData } from "react-router-dom";
import SameProviderCard from "./SameProviderCard";

const SameProvider = () => {
  const loadSameProviderData = useLoaderData();
  return (
    <div className="my-7">
      <p className="mb-6 text-center font-semibold text-2xl">
        Total {loadSameProviderData?.length} Books
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {loadSameProviderData?.map((soloBook) => (
          <SameProviderCard
            key={soloBook._id}
            getBooks={soloBook}
          ></SameProviderCard>
        ))}
      </div>
    </div>
  );
};

export default SameProvider;
