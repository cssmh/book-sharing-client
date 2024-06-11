import { Link } from "react-router-dom";
import banner from "../assets/Banner.jpeg";
import useAuth from "../Hooks/useAuth";
import useMyBooks from "../Hooks/useMyBooks";

const Banner = () => {
  const { user } = useAuth();
  const url = `/my-books?email=${user?.email}`;
  const { isLoading, bookData } = useMyBooks(url);
  
  return (
    <div className="px-6 pt-10 lg:pt-24 mx-auto text-center dark:bg-gray-950">
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
        <h1
          className="w-full bg-gradient-to-r from-green-300 via-blue-500 to-blue-500 bg-clip-text text-transparent sm:text-5xl text-3xl font-bold lg:text-6xl aos-init"
          data-aos="fade-up"
          data-aos-easing="ease-in"
          data-aos-duration="900"
        >
          Share Exchange Unleashed
        </h1>
        <p
          className="max-w-lg mx-auto mt-4 text-gray-500 dark:text-gray-300 aos-init"
          data-aos="fade-up"
          data-aos-easing="ease-in"
          data-aos-duration="900"
        >
          Discover new books, provide and share the knowledge that <br></br>{" "}
          shape our future together.
        </p>
        <Link to={"/add-book"}>
          <button
            data-aos="fade-up"
            data-aos-easing="ease-in"
            data-aos-duration="900"
            className="px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white capitalize bg-green-400 rounded-md hover:bg-green-400/90 lg:mx-0 lg:w-auto focus:outline-none transition duration-300 flex gap-1 aos-init"
          >
            Start sharing now
            {isLoading ? (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="text-lg"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11V7a4 4 0 00-8 0v4M5 11h14v12H5V11z"
                ></path>
              </svg>
            ) : (
              bookData && (
                <span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-lg"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    ></path>
                  </svg>
                </span>
              )
            )}
          </button>
        </Link>
        <p
          data-aos="fade-up"
          data-aos-easing="ease-in"
          data-aos-duration="900"
          className="mt-3 font-medium text-gray-600 text-sm dark:text-gray-400 aos-init"
        >
          Have a good day!
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-easing="ease-in"
        data-aos-duration="900"
        className="flex justify-center mt-10 aos-init"
      >
        <img
          className="object-cover w-full lg:h-96 rounded-xl lg:w-4/5"
          src={banner}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
};

export default Banner;
