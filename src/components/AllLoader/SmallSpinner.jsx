import { FallingLines } from "react-loader-spinner";

const SmallSpinner = () => {
  return (
    <div className="flex justify-center mt-5">
      <FallingLines
        color="#9933FF"
        width="55"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default SmallSpinner;
