import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularBooks from "../pages/PopularBooks/PopularBooks";
import AboutUs from "./AboutUs";
import ShareMagic from "./ShareMagic";
import LatestUpdates from "./LatestUpdates";
import Reviews from "./Reviews";
import Count from "./Count/";
import BookTypes from "./BookTypes/";
import Support from "./Support";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner />
      <PopularBooks />
      <AboutUs />
      <ShareMagic />
      <BookTypes />
      <LatestUpdates />
      <Reviews />
      <Count />
      <Support />
    </div>
  );
};

export default Home;
