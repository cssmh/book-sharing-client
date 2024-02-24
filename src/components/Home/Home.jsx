import { useLoaderData } from "react-router-dom";
import Banner from "../Header/Banner/Banner";
import { Helmet } from "react-helmet-async";
import PopularBooks from "../../pages/PopularBooks/PopularBooks";
import Review from "../Review/Review";
import BestSelling from "../BestSelling/BestSelling";
import GreenBook from "../GreenBook/GreenBook";
import Counting from "../Counting/Counting";
import AboutUs from "../AboutUs/AboutUs";

const Home = () => {
  const allBooks = useLoaderData();
  const books = allBooks.slice(0, 3);
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularBooks books={books}></PopularBooks>
      <AboutUs></AboutUs>
      <BestSelling></BestSelling>
      <GreenBook></GreenBook>
      <Review></Review>
      <Counting></Counting>
    </div>
  );
};

export default Home;
