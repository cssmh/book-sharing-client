import { Helmet } from "react-helmet-async";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import Review from "../Review/Review";
import AtomicHabit from "../AtomicHabit/AtomicHabit";
import BestSelling from "../BestSelling/BestSelling";
import Counting from "../Counting/Counting";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularBooks></PopularBooks>
      <AboutUs></AboutUs>
      <BestSelling></BestSelling>
      <AtomicHabit></AtomicHabit>
      <Review></Review>
      <Counting></Counting>
    </div>
  );
};

export default Home;
