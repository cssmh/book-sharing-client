import { Link } from "react-router-dom";
import useBookProviders from "../Hooks/useBookProviders";
import { Helmet } from "react-helmet-async";
import { ScaleLoader } from "react-spinners";

const BooksProviders = () => {
  const { providerLoading, bookProviders } = useBookProviders();

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg px-6 py-4">
      <Helmet>
        <title>BookHaven | Books Providers</title>
      </Helmet>
      <h1 className="text-2xl font-semibold text-center mb-6">
        All Books Providers ({(!providerLoading && bookProviders?.length) || 0})
      </h1>
      {providerLoading ? (
        <div className="flex flex-wrap gap-6 justify-center">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse w-full md:w-1/3 bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col items-center"
            >
              <div className="bg-gray-300 h-6 w-3/4 rounded mb-4"></div>
              <div className="bg-gray-300 h-8 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {bookProviders?.map((provider, idx) => (
            <div
              key={idx}
              className="bg-gray-100 border border-gray-300 rounded-lg p-6 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800 text-lg font-medium mb-4">
                {provider.email}
              </p>
              <Link
                to={`/provider/${provider.email}`}
                className="text-green-600 font-semibold hover:underline"
              >
                {provider.count} Books
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksProviders;
