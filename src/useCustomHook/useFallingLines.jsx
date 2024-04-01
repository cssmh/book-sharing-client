import { FallingLines } from "react-loader-spinner";

const useFallingLines = () => {
  return (
    <div className="flex justify-center">
      <FallingLines
        color="#9933FF"
        width="60"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default useFallingLines;

// used in MyPending, MyBooks, MyBookings, MyPending, 
// PrivateRoute, adminPrivateRoute
