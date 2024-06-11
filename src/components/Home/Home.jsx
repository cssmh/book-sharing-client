import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import AboutUs from "../AboutUs/AboutUs";
import ShareMagic from "../ShareMagic/ShareMagic";
import LatestUpdates from "../LatestUpdates/LatestUpdates";
import Reviews from "../Reviews/Reviews";
import Count from "../Count/Count";
import BookTypes from "../BookTypes/BookTypes";
import Support from "../Support/Support";

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
