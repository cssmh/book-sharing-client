import Loader from "../../assets/Loader.gif";

const BigLoader = () => {
  return (
    <div className="w-full min-h-[95vh] flex justify-center items-center">
      <img src={Loader} className="w-3/5 md:w-[25%]" alt="" />
    </div>
  );
};

export default BigLoader;
