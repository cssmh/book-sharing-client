import { Link } from "react-router-dom";
import useBookProviders from "../Hooks/useBookProviders";
import HavenHelmet from "../Components/HavenHelmet";

const BooksProviders = () => {
  const { loading, bookProviders } = useBookProviders();

  return (
    <div className="max-w-6xl mx-auto rounded-lg px-6 py-3">
      <HavenHelmet title={"Books Providers"} />
      <h1 className="text-xl font-semibold text-center mb-4">
        All Books Providers ({(!loading && bookProviders?.length) || 0})
      </h1>
      {loading ? (
        <div className="flex flex-wrap gap-4 justify-center">
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
        <div className="flex flex-wrap gap-4 justify-center">
          {bookProviders?.map((provider, idx) => (
            <div
              key={idx}
              className="bg-base-100 border border-gray-300 rounded-lg px-4 md:px-5 py-1.5 md:py-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <p className="text-gray-800 text-lg font-medium md:mb-2">
                {provider.email}
              </p>
              <Link
                to={`/book/${provider.email}/${provider.firstBookId}`}
                className="text-green-600 font-semibold hover:underline transform active:translate-y-0.5 transition-transform duration-150 ease-in-out"
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
