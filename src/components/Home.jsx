import Banner from "./Banner";
import PopularBooks from "../pages/PopularBooks/PopularBooks";
import AboutUs from "./AboutUs";
import ShareMagic from "./ShareMagic";
import LatestUpdates from "./LatestUpdates";
import Reviews from "./Reviews";
import Count from "./Count/";
import BookTypes from "./BookTypes/";
import SupportScroll from "./SupportScroll";
import HavenHelmet from "./HavenHelmet";

const Home = () => {
  return (
    <div>
      <HavenHelmet title={"Let's Share Books"} />
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
