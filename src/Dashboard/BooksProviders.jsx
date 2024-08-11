import { Link } from "react-router-dom";
import useBookProviders from "../Hooks/useBookProviders";
import { Helmet } from "react-helmet-async";

const BooksProviders = () => {
  const { providerLoading, bookProviders } = useBookProviders();

  return (
    <div>
      <Helmet>
        <title>BookHaven | Books Providers</title>
      </Helmet>
      <h1 className="text-center font-semibold text-xl mb-3 mt-2 md:mt-0">
        All Books Providers ({(!providerLoading && bookProviders?.length) || 0})
      </h1>
      {providerLoading ? (
        <div className="max-w-[1180px] mx-2 md:mx-auto grid md:grid-cols-3 py-3 border border-green-400 rounded-lg mb-3 px-4 md:px-0 md:text-center">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="animate-pulse mb-4">
              <p className="bg-gray-300 h-6 w-3/4 mx-auto rounded"></p>
              <div className="flex justify-center items-center mt-2">
                <div className="bg-gray-300 h-8 w-1/2 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-[1180px] mx-2 md:mx-auto grid md:grid-cols-3 py-3 border border-green-400 rounded-lg mb-3 px-4 md:px-0 md:text-center">
          {bookProviders?.map((provider, idx) => (
            <p key={idx}>
              {provider.email}:{" "}
              <Link
                className="text-green-500"
                to={`/provider/${provider.email}`}
              >
                {provider.count} Books
              </Link>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksProviders;
