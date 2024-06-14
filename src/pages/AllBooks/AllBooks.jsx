import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import AllBooksCard from "../AllBooksCard/AllBooksCard";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import useResLimit from "../../Hooks/useResLimit";
import useQueryPublic from "../../Hooks/useQueryPublic";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const isMobile = useResLimit("(max-width: 767px)");
  const [limit, setLimit] = useState(isMobile ? 6 : 9);

  useEffect(() => {
    setLimit(isMobile ? 6 : 9);
    setPage(1);
  }, [isMobile]);

  const url = `/all-books?page=${page}&limit=${limit}&search=${searchTerm}`;
  const { data = [], isLoading } = useQueryPublic(
    ["allBooksData", page, limit, searchTerm],
    url
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < data?.totalPages) setPage(page + 1);
  };

  return (
    <div>
      <Helmet>
        <title>BookHaven | All Books</title>
      </Helmet>
      <div className="text-center mt-4">
        <input
          id="search"
          type="text"
          name="name"
          onChange={handleSearch}
          placeholder="Search for Books or Authors"
          className="input input-bordered rounded-3xl min-w-[75%] md:min-w-[320px] border-red-500"
          style={{ outline: "none" }}
        />
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto my-10">
          {[...Array(3)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        <div>
          {data?.result?.length === 0 ? (
            <p className="text-center text-xl md:text-2xl font-semibold text-red-600 mt-6">
              No Book found!
            </p>
          ) : (
            <div>
              <h1 className="text-xl md:text-[25px] font-semibold italic text-center my-3">
                All Books Available for you
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {data?.result?.map((book) => (
                  <AllBooksCard key={book._id} getBook={book}></AllBooksCard>
                ))}
              </div>
            </div>
          )}
          {data?.result?.length > 0 && (
            <div className="flex justify-center mb-6">
              <div className="flex flex-col md:flex-row justify-center mt-8">
                <div className="join">
                  <button
                    onClick={handlePrevious}
                    className="join-item btn btn-active hover:border-green-400 hover:bg-yellow-50 border-green-400 bg-yellow-50 hover:text-green-40 text-green-400"
                  >
                    Previous
                  </button>
                  <div className="flex flex-wrap m-0 justify-center md:justify-start">
                    {Array(data?.totalPages)
                      .fill(0)
                      .map((_, idx) => {
                        const pageNumber = idx + 1;
                        return (
                          <button
                            onClick={() => setPage(pageNumber)}
                            key={pageNumber}
                            className={
                              page === pageNumber
                                ? "btn border-green-400 hover:border-green-400 bg-green-400 text-white rounded-none mb-2"
                                : "btn border-green-400 hover:border-green-400 bg-yellow-50 hover:bg-green-400 text-green-400 hover:text-white rounded-none mb-2 md:mb-0"
                            }
                          >
                            {pageNumber}
                          </button>
                        );
                      })}
                  </div>
                  <button
                    onClick={handleNext}
                    className="join-item btn btn-active hover:border-green-400 hover:bg-yellow-50 border-green-400 bg-yellow-50 hover:text-green-40 text-green-400"
                  >
                    Next
                  </button>
                </div>
                <div className="ml-6 md:ml-0 text-center md:text-left mt-2 md:mt-0">
                  <select
                    onChange={(e) => {
                      setLimit(parseInt(e.target.value));
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
