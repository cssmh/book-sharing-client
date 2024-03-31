import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLoader } from "react-spinners";
import PopularBookCard from "../PopularBookCard/PopularBookCard";
import axios from "axios";

const PopularBooks = () => {
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://book-sharing-server.vercel.app/allBooks").then((res) => {
      setPopularBooks(res.data.result);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="100">
        <h3 className="text-center my-8 font-bold text-2xl md:text-3xl italic border-b-2 pb-3 max-w-md mx-auto border-blue-700">
          Our Popular Books
        </h3>
      </div>
      {isLoading ? (
        <div className="flex justify-center my-5">
          <HashLoader color="#FB0F5A" size={36} />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-5">
            {popularBooks?.slice(0, 3).map((books) => (
              <PopularBookCard
                key={books._id}
                getBook={books}
              ></PopularBookCard>
            ))}
          </div>
          <div className="flex justify-center my-10">
            <Link to="/all-books">
              <button className="text-white bg-gradient-to-r from-green-400 via-green-400 to-green-400 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Show all Books
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularBooks;
