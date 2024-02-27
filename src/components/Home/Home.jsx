import { Helmet } from "react-helmet-async";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import Review from "../Review/Review";
import BestSelling from "../BestSelling/BestSelling";
import GreenBook from "../GreenBook/GreenBook";
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
      <GreenBook></GreenBook>
      <Review></Review>
      <Counting></Counting>
    </div>
  );
};

export default Home;
