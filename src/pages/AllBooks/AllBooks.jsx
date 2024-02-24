import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import AllBooksCard from "./AllBooksCard";
import { FallingLines } from "react-loader-spinner";

const AllBooks = () => {
  const allBooks = useLoaderData();
  let searchTerm;
  const [filter, setFilter] = useState(allBooks);
  // console.log(filter);
  if (allBooks.length == 0) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#6cc262"
          width="70"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>BookHaven | All Books</title>
      </Helmet>
      <div className="text-center my-6">
        <input
          type="text"
          name="name"
          placeholder="Search Here"
          className="input input-bordered w-80 border-red-500 "
          onChange={(e) => {
            searchTerm = e.target.value;
            console.log(searchTerm);

            if (searchTerm === "") {
              setFilter(allBooks);
            } else {
              const searchItem = allBooks.filter((service) =>
                service.book_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              );
              setFilter(searchItem);
            }
          }}
        />
        <h2 className="mt-4 text-2xl md:text-3xl font-bold italic">
          All Books Available for you
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {filter.map((book) => (
          <AllBooksCard key={book._id} getBook={book}></AllBooksCard>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
