import { useState } from "react";
import Reader from "../assets/Reader.png";

const ShareMagic = () => {
  const [expanded, setExpanded] = useState(false);
  const text = `Sharing books allows ideas, stories, and knowledge to spread among
  individuals, communities, and cultures. It facilitates the transfer
  of information and promotes learning. Books reflect diverse
  perspectives, experiences, and cultures. Sharing books enables
  people to understand and appreciate different backgrounds, fostering
  cultural exchange and empathy. Access to books is essential for
  developing literacy skills. By sharing books, especially with those
  who have limited access, we can promote literacy and empower
  individuals to engage with written material effectively. Sharing
  books can create connections and spark discussions among readers. It
  brings people together to share their thoughts, interpretations, and
  experiences, fostering social bonds and a sense of community.`;

  return (
    <div className="my-12 max-w-[1220px] mx-auto">
      <p
        data-aos="fade-up"
        data-aos-duration="700"
        data-aos-anchor-placement="top-center"
        className="font-semibold text-center lg:text-left mb-2 lg:mb-0"
      >
        THE MAGIC OF SHARING
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 text-center lg:text-right lg:mr-5 px-3">
          <p className="text-3xl md:text-5xl text-orange-500 mb-5">
            Building Communities
            <br />
            Through Books
          </p>
          <p className="text-gray-500 mx-2 lg:mx-0 mb-1 hidden md:block">
            {text}
          </p>
          <p className="text-gray-500 mx-2 lg:mx-0 mb-1 md:hidden">
            {expanded ? text : `${text.slice(0, 300)}...`}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="md:hidden text-blue-500"
            aria-expanded={expanded}
            aria-controls="text-content"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-anchor-placement="top-center"
          className="lg:w-1/4 mx-auto mt-6 lg:mt-0"
        >
          <img
            src={Reader}
            alt="Person reading a book"
            className="w-1/2 md:w-[85%] mx-auto"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareMagic;
