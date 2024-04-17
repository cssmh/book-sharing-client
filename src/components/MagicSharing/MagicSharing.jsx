import Reader from "../../assets/Reader.png";
const MagicSharing = () => {
  return (
    <div className="my-12 max-w-[1220px] mx-auto">
      <p className="font-semibold text-center lg:text-left mb-2 lg:mb-0">
        THE MAGIC OF SHARING
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 text-center lg:text-right space-y-5 lg:mr-5 px-3">
          <p className="text-3xl md:text-6xl text-orange-500">
            Building Communities<br></br>Through Books
          </p>
          <p className="text-gray-500 mx-2 lg:mx-0">
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
            experiences, fostering social bonds and a sense of community. Books
            stimulate creativity and imagination by exposing readers to new
            ideas, worlds, and possibilities. Sharing books encourages
            individuals to explore their imagination and think critically about
            the content they encounter. Books have the power to inspire, educate,
            and motivate individuals. By sharing books, we provide others with
            the opportunity for personal
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="1000"
          className="lg:w-1/4 mx-auto mt-6 lg:mt-0"
        >
          <img src={Reader} onContextMenu={(e) => e.preventDefault()} />
        </div>
      </div>
    </div>
  );
};

export default MagicSharing;