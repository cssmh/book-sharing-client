import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Header/Banner/Banner";
import PopularServices from "../../components/PopularServices/PopularServices";
import { Helmet } from "react-helmet-async";

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
    </div>
  );
};

export default Home;
