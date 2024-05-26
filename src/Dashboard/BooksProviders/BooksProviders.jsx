import { Link } from "react-router-dom";
import useProviderHook from "../../Shared/useCustomHook/useProviderHook";

const BooksProviders = () => {
  const { booksByProvider } = useProviderHook();
  const providerArray = Object.entries(booksByProvider).map(
    ([email, count]) => ({
      email,
      count,
    })
  );

  return (
    <div>
      <h1 className="text-center text-xl mb-5">All Books Provider</h1>
      <div className="max-w-[1180px] mx-2 md:mx-auto grid md:grid-cols-3 py-3 border border-green-400 rounded-lg mb-3 px-10 md:px-0 md:text-center">
        {providerArray?.map((provider, idx) => (
          <p key={idx}>
            {provider.email}:{" "}
            <Link className="text-green-500" to={`/provider/${provider.email}`}>
              {provider.count} Books
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};

export default BooksProviders;
