import pencil from "../../assets/pencil.jpg";
import useTotalProviderHook from "../../useCustomHook/useTotalProviderHook";

const Counting = () => {
  const { uniqueEmails, allBooks } = useTotalProviderHook();

  return (
    <div
      className="hero min-h-[30vh]"
      style={{
        backgroundImage: `url(${pencil})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52">
          <div data-aos="flip-left" data-aos-duration="1000">
            <p className="text-red-500">Books</p>
            <p className="text-gray-500">{allBooks?.length}</p>
          </div>
          <div data-aos="flip-up" data-aos-duration="1000">
            <p className="text-green-500">Providers</p>
            <p className="text-gray-500">{uniqueEmails.length}</p>
          </div>
          <div data-aos="flip-right" data-aos-duration="1000">
            <p className="text-blue-500">Readers</p>
            <p className="text-gray-500">{uniqueEmails.length * 2 + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counting;
