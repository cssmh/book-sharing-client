import { ThreeCircles } from "react-loader-spinner";
// import { PacmanLoader } from "react-spinners";
const MainLoader = () => {
  // const loadingSpinnerContainer = {
  //   position: "fixed",
  //   top: 0,
  //   right: 0,
  //   bottom: 0,
  //   left: 0,
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  //   zIndex: 5000,
  //   display: "flex",
  //   justifyContent: "center",
  //   alignItems: "center",
  // };

  // const loadingSpinner = {
  //   width: "64px",
  //   height: "64px",
  //   border: "8px solid",
  //   borderColor: "#00cc66 transparent #00cc66 transparent",
  //   borderRadius: "50%",
  //   animation: "spin 1.2s linear infinite",
  // };

  return (
    <div className="w-full min-h-[96vh] flex justify-center items-center">
      {/* <div style={loadingSpinnerContainer}>
        <div style={loadingSpinner}></div>
      </div> */}
      {/* <PacmanLoader color="#00CC66" size={42} /> */}
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#3498db"
        innerCircleColor="#e67e22"
        middleCircleColor="#e74c3c"
      />
    </div>
  );
};

export default MainLoader;
