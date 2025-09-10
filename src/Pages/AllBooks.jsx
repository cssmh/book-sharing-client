import { useState } from "react";
import SkeletonCard from "../Components/AllSkeleton/SkeletonCard";
import AllBooksCard from "./AllBooksCard";
import useDataQuery from "../Hooks/useDataQuery";
import HavenHelmet from "../Components/HavenHelmet";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);

  const url = `/all-books?page=${page}&limit=${limit}&search=${searchTerm}`;
  const { data = {}, isLoading } = useDataQuery(
    ["allBooksData", page, limit, searchTerm],
    url
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage((prev) => prev + 1);
  };

  return (
    <div>
      <HavenHelmet title="All Books" />
      <div className="text-center mt-4">
        <input
          id="search"
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search for Books or Authors or Locations"
          className="input h-[44px] input-bordered rounded-3xl min-w-[75%] md:min-w-[330px] border-red-500"
          style={{ outline: "none" }}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mt-7 mb-9">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div>
          {data?.result?.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
              No Books found!
            </p>
          ) : (
            <div>
              <h1 className="text-xl md:text-[22px] font-semibold italic text-center my-3">
                All Books Available for You
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
                {data?.result?.map((book) => (
                  <AllBooksCard key={book._id} getBook={book} />
                ))}
              </div>
            </div>
          )}
          {data?.result?.length > 0 && (
            <div className="flex flex-col items-center mb-4">
              <div className="flex flex-col md:flex-row items-center mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className="btn border-green-400 bg-yellow-50 hover:bg-green-400 hover:text-white text-green-400 hover:border-green-400 disabled:opacity-50 mb-2 md:mb-0"
                >
                  Previous
                </button>
                <div className="flex flex-wrap m-0 justify-center md:justify-start mx-[6px]">
                  {Array.from({ length: data?.totalPages || 1 }, (_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setPage(idx + 1)}
                      className={`btn border-green-400 ${
                        page === idx + 1
                          ? "bg-green-400 text-white"
                          : "bg-yellow-50 text-green-400 hover:bg-green-400 hover:text-white"
                      } rounded-none mb-2 md:mb-0 mx-[2px]`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  disabled={page === data?.totalPages}
                  className="btn border-green-400 bg-yellow-50 hover:bg-green-400 hover:text-white text-green-400 hover:border-green-400 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
              <div className="mt-2 text-center md:text-left">
                <select
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setPage(1);
                  }}
                  value={limit}
                  className="input input-bordered border-green-400 text-green-500 outline-none"
                >
                  <option value="3">3</option>
                  <option value="6">6</option>
                  <option value="9">9</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
