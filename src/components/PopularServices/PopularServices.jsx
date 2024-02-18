import { Link } from "react-router-dom";
import PopularServiceCard from "./PopularServiceCard";

const PopularServices = ({ services }) => {
  // HomePage Popular Books

  return (
    <div>
      <div data-aos="zoom-in" data-aos-delay="100" data-aos-offset="100">
        <h3 className="text-center my-8 font-bold text-2xl md:text-3xl italic border-b-2 pb-3 max-w-md mx-auto border-blue-700">
          Our Popular Books
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-5">
        {services?.map((service) => (
          <PopularServiceCard
            key={service._id}
            service={service}
          ></PopularServiceCard>
        ))}
      </div>
      <div className="flex justify-center my-10">
        <Link to="/all-books">
          <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Show all Books
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopularServices;
