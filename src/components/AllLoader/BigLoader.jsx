import Loader from "../../assets/Loader.gif";

const BigLoader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white">
      <img src={Loader} className="w-3/5 md:w-[25%]" alt="Loading..." />
    </div>
  );
};

export default BigLoader;
