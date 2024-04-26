import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import AboutUs from "../AboutUs/AboutUs";
import ShareMagic from "../ShareMagic/ShareMagic";
import AtomicHabit from "../AtomicHabit/AtomicHabit";
import Reviews from "../Reviews/Reviews";
import Count from "../Count/Count";
const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularBooks></PopularBooks>
      <AboutUs></AboutUs>
      <ShareMagic></ShareMagic>
      <AtomicHabit></AtomicHabit>
      <Reviews></Reviews>
      <Count></Count>
    </div>
  );
};

export default Home;
