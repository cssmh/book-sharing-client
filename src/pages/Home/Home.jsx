import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Header/Banner/Banner";
import PopularServices from "../../components/PopularServices/PopularServices";
import { Helmet } from "react-helmet-async";
import Review from "../Review/Review";
import AboutUs from "../AboutUs/AboutUs";

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
      <Review></Review>
    </div>
  );
};

export default Home;
