import { Link } from "react-router-dom";
import useBookProviders from "../Hooks/useBookProviders";
import { HashLoader } from "react-spinners";

const BooksProviders = () => {
  const { booksByProvider, isLoading } = useBookProviders();
  const providers = Object.entries(booksByProvider).map(([email, count]) => ({
    email,
    count,
  }));

  return (
    <div>
      <h1 className="text-center text-xl mb-5">
        All Books Providers ({providers.length || 0})
      </h1>
      {isLoading ? (
        <div className="flex justify-center mt-5">
          <HashLoader color="#00CC66" size={32} />
        </div>
      ) : (
        <div className="max-w-[1180px] mx-2 md:mx-auto grid md:grid-cols-3 py-3 border border-green-400 rounded-lg mb-3 px-10 md:px-0 md:text-center">
          {providers?.map((provider, idx) => (
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
