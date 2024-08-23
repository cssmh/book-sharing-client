import { Helmet } from "react-helmet-async";

const HavenHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | BookHaven</title>
    </Helmet>
  );
};

export default HavenHelmet;
