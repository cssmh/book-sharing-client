import { ScaleLoader } from "react-spinners";

const SmallLoader = () => {
  return (
    <div className="h-[82vh] flex justify-center items-center">
      <ScaleLoader size={100} color="red" />
    </div>
  );
};

export default SmallLoader;
