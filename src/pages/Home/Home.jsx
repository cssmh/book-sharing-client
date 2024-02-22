import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Header/Banner/Banner";
import PopularServices from "../../components/PopularServices/PopularServices";
import { Helmet } from "react-helmet-async";
import Review from "../Review/Review";
import AboutUs from "../AboutUs/AboutUs";
import BestSelling from "../../components/BestSelling/BestSelling";
import GreenBook from "../../components/GreenBook/GreenBook";
import Count from "../../components/Count/Count";

const Home = () => {
  const popularServices = useLoaderData();
  const services = popularServices.slice(0, 3);
  return (
    <div>
      <Helmet>
        <title>BookHaven | Home</title>
      </Helmet>
      <Banner></Banner>
      <PopularServices services={services}></PopularServices>
      <AboutUs></AboutUs>
      <BestSelling></BestSelling>
      <GreenBook></GreenBook>
      <Review></Review>
      <Count></Count>
    </div>
  );
};

export default Home;
