import { useState } from "react";
import Reader from "../../assets/Reader.png";

const ShareMagic = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const getTextToShow = () => {
    if (isExpanded) {
      return text;
    }
    const words = text.split(" ");
    return words.slice(0, 60).join(" ") + (words.length > 60 ? "..." : "");
  };

  return (
    <div className="my-12 max-w-[1220px] mx-auto">
      <p
        data-aos="fade-up"
        data-aos-anchor-placement="top-center"
        data-aos-duration="1000"
        className="font-semibold text-center lg:text-left mb-2 lg:mb-0"
      >
        THE MAGIC OF SHARING
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 text-center lg:text-right lg:mr-5 px-3">
          <p className="text-3xl md:text-5xl text-orange-500 mb-5">
            Building Communities<br></br>Through Books
          </p>
          <p className="hidden md:block text-gray-500 mx-2 lg:mx-0 mb-1">
            Sharing books allows ideas, stories, and knowledge to spread among
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
            experiences, fostering social bonds and a sense of community.
          </p>
          <p className="md:hidden text-gray-500 mx-2 lg:mx-0 mb-1">
            {getTextToShow()}
          </p>
          <button onClick={toggleExpanded} className="md:hidden">
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="1000"
          className="lg:w-1/4 mx-auto mt-6 lg:mt-0"
        >
          <img
            src={Reader}
            className="w-1/2 md:w-[85%] mx-auto"
            onContextMenu={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareMagic;
