import swal from "sweetalert";
import atomicHabit from "../../assets/Atomic.png";
const AtomicHabit = () => {
  const handleBuy = () => {
    swal("Sorry!", "Atomic Habits is not available Now!");
  };
  return (
    <div className="bg-base-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center py-4 space-y-6 lg:space-y-0 mb-10">
      <div data-aos="zoom-in-right" data-aos-duration="1000">
        <img src={atomicHabit} className="w-3/4 mx-auto" alt="" />
      </div>
      <div className="space-y-2 text-center lg:text-left">
        <p className="p-2 bg-orange-500 w-24 mx-auto lg:mx-0 text-white rounded-md">
          FEATURED
        </p>
        <p
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="text-4xl font-semibold"
        >
          Atomic Habits will teach you how to make small changes that will
          transform your habits and deliver amazing results.
        </p>
        <p>By: James Clear</p>
      </div>
      <div
        data-aos="zoom-in"
        data-aos-duration="1000"
        className="text-center space-y-2"
      >
        <p className="text-4xl">Order Now</p>
        <p className="text-2xl">350 BDT</p>
        <button
          onClick={handleBuy}
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AtomicHabit;
