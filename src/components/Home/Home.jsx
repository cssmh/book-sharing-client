import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import AboutUs from "../AboutUs/AboutUs";
import BestSelling from "../BestSelling/BestSelling";
import AtomicHabit from "../AtomicHabit/AtomicHabit";
import UserReview from "../UserReview/UserReview";
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
      <BestSelling></BestSelling>
      <AtomicHabit></AtomicHabit>
      <UserReview></UserReview>
      <Counting></Counting>
    </div>
  );
};

export default Home;
