import Loader from "../assets/Loader.gif";
// import { ScaleLoader } from "react-spinners";

const SmallLoader = ({ size }) => {
  const loaderStyle = {
    height: `${size}vh`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    // <div
    //   style={{ height: `${size}vh` }}
    //   className="flex justify-center items-center"
    // >
    //   <ScaleLoader size={100} color="red" />
    // </div>
    <div style={loaderStyle} className="flex justify-center items-center">
      <img src={Loader} className="w-36" alt="Loading..." />
    </div>
  );
};

export default SmallLoader;
