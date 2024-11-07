import Reader from "../assets/Reader.png";

const ShareMagic = () => {
  return (
    <div className="max-w-5xl 2xl:max-w-[80%] mx-auto pt-5 pb-7">
      <h2 className="text-2xl lg:text-3xl font-bold text-center mb-6 text-gray-800">
        The Magic of Sharing
      </h2>
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="w-1/2 md:w-[250px] mx-auto mb-3 md:mb-0">
          <img
            src={Reader}
            alt="Person reading a book"
            className="w-full lg:max-w-md rounded-lg shadow-xl"
          />
        </div>
        <div className="lg:w-1/2 lg:pr-4">
          <h3
            data-aos="zoom-in-up"
            className="text-xl lg:text-2xl font-semibold text-orange-500 mb-4 text-center lg:text-left"
          >
            Building Communities Through Books
          </h3>
          <p
            data-aos="zoom-in-up"
            data-aos-duration="1100"
            className="text-gray-700 mx-6 md:mx-0"
          >
            Sharing books allows ideas, stories, and knowledge to spread among
            individuals, communities, and cultures. It facilitates the transfer
            of information and promotes learning. Books reflect diverse
            perspectives, experiences, and cultures. Sharing books enables
            people to understand and appreciate different backgrounds, fostering
            cultural exchange and empathy. Access to books is essential for
            developing literacy skills. By sharing books, especially with those
            who have limited access, we can promote literacy and empower
            individuals to engage with written material effectively. Sharing
            books can create connections and spark discussions among readers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShareMagic;
