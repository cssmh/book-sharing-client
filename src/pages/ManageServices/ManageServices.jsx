import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import ManageServiceCard from "./ManageServiceCard";
import { Helmet } from "react-helmet-async";
import { FallingLines } from "react-loader-spinner";

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  // console.log(user);
  const url = `https://book-sharing-server.vercel.app/services?email=${user.email}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setServices(res.data);
      setLoading(false);
    });
  }, [url]);
  // My Books page

  return (
    <div>
      <Helmet>
        <title>BookHaven | My-Books</title>
      </Helmet>
      <h2 className="text-2xl md:text-3xl font-bold mt-9 mb-5 text-center italic">
        All Books Added By You
      </h2>
      {loading && (
        <div className="flex justify-center">
          <FallingLines
            color="#800080"
            width="70"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
      {services.length == 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold text-red-600">
          No Book Added By You
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <ManageServiceCard
              key={service._id}
              service={service}
              services={services}
              setServices={setServices}
            ></ManageServiceCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;
