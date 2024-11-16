import Loader from "../assets/Loader.gif";

const BigLoader = () => {
  const loaderContainer = {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 35,
    left: 0,
    backgroundColor: "white",
    zIndex: 5000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={loaderContainer}>
      <img src={Loader} className="w-3/5 md:w-[25%]" alt="Loading..." />
    </div>
  );
};

export default BigLoader;
