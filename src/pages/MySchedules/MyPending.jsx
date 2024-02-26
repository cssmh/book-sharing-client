import { useContext, useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { AuthContext } from "../../AuthProviders/AuthProviders";
import axios from "axios";
import MyPendingCard from "./MyPendingCard";

const MyPending = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState([]);

  const url = `http://localhost:5000/pending?email=${user.email}`;
  useEffect(() => {
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setPending(res.data);
        setLoading(false);
      })
      .then((err) => console.log(err));
  }, [url]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <FallingLines
          color="#6cc262"
          width="70"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center text-xl md:text-2xl my-6 font-semibold italic">
        User Booked Your Books
      </h2>
      {pending.length == 0 ? (
        <p className="text-center text-xl md:text-2xl font-semibold italic">
          No User Booked Your Books
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {pending.map((solo) => (
            <MyPendingCard key={solo._id} getPending={solo}></MyPendingCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPending;
