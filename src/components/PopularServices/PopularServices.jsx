import { Link } from "react-router-dom";
import PopularServiceCard from "./PopularServiceCard";

const PopularServices = ({ services }) => {
  return (
    <div>
      <div data-aos="zoom-in" data-asos-delay="100" data-aos-offset="100">
        <h3 className="text-center my-14 font-bold text-3xl italic border-b-2 pb-1 max-w-md mx-auto border-blue-700">
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

      <div className="flex justify-center">
        <button className="btn btn-outline my-10">
          {" "}
          <Link to="/services">Show all</Link>
        </button>
      </div>
    </div>
  );
};

export default PopularServices;
