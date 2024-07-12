import { Link } from "react-router-dom";
import useBookProviders from "../Hooks/useBookProviders";
import SmallLoader from "../Components/AllLoader/SmallLoader";
import { Helmet } from "react-helmet-async";

const BooksProviders = () => {
  const { providerLoading, bookProviders } = useBookProviders();

  return (
    <div>
      <Helmet>
        <title>BookHaven | Books Providers</title>
      </Helmet>
      <h1 className="text-center text-xl mb-3 mt-2 md:mt-0">
        All Books Providers ({(!providerLoading && bookProviders?.length) || 0})
      </h1>
      {providerLoading ? (
        <SmallLoader />
      ) : (
        <div className="max-w-[1180px] mx-2 md:mx-auto grid md:grid-cols-3 py-3 border border-green-400 rounded-lg mb-3 px-10 md:px-0 md:text-center">
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
