import seller from "../../assets/seller.webp";
import book1 from "../../assets/book1.webp";
import book2 from "../../assets/book2.webp";
import book3 from "../../assets/book3.webp";
import book4 from "../../assets/book4.webp";
const BestSelling = () => {
  return (
    <div className="my-12 max-w-7xl mx-auto">
      <h1 className="font-semibold text-center lg:text-left">
        AUTHOR BEST SELLING
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0">
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="text-center lg:text-right space-y-5 lg:mr-5 px-3"
        >
          <h1 className="text-7xl text-orange-500">
            J. K.<br></br> Rowling
          </h1>
          <p>CATEGORIES:BOOKS , THE WHISPERING FOREST</p>
          <p className="text-gray-500">
            Title: The Whispering Forest In the heart of the ancient woods lies
            a secret known only to a select few. The Whispering Forest penned by
            acclaimed author Emily Mayfield, unravels the enigmatic tale of a
            young girl named Elara who stumbles upon the hidden realm within the
            woods. Elara, an adventurous soul with an insatiable curiosity,
            discovers an entrance to a magical world concealed from ordinary
            eyes. As she ventures deeper into the forest, Elara encounters
            mystical creatures, each guarding a piece of the forest ancient
            history. With the help of a wise old owl named Thalwyn and a
            mischievous fox named Finn, she embarks on a journey to uncover the
            truth behind the whispers that echo through the trees.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-anchor-placement="top-center"
        >
          <img src={seller} className="rounded-md mx-auto lg:mx-0" alt="" />
        </div>
        <div
          data-aos="flip-right"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          className="grid grid-cols-2"
        >
          <img src={book1} alt="" />
          <img src={book2} alt="" />
          <img src={book3} alt="" />
          <img src={book4} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
