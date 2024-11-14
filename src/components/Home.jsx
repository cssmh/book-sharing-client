import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import PopularBooks from "../pages/PopularBooks";
import AboutUs from "./AboutUs";
import ShareMagic from "./ShareMagic";
import LatestUpdates from "./LatestUpdates";
import Reviews from "./Reviews";
import Count from "./Count/";
import BookTypes from "./BookTypes/";
import SupportScroll from "./SupportScroll";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Let&apos;s Share and Discover Books</title>
      </Helmet>
      <Banner />
      <PopularBooks />
      <AboutUs />
      <BookTypes />
      <ShareMagic />
      <LatestUpdates />
      <Reviews />
      <Count />
      <SupportScroll />
    </div>
  );
};

export default Home;
