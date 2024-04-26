import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import AboutUs from "../AboutUs/AboutUs";
import MagicSharing from "../MagicSharing/MagicSharing";
import AtomicHabit from "../AtomicHabit/AtomicHabit";
import Review from "../Review/Review";
import Counting from "../Counting/Counting";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularBooks></PopularBooks>
      <AboutUs></AboutUs>
      <MagicSharing></MagicSharing>
      <AtomicHabit></AtomicHabit>
      <Review></Review>
      <Counting></Counting>
    </div>
  );
};

export default Home;
