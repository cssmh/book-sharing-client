import atomicHabit from "../../assets/Atomic.png";
const AtomicHabit = () => {
  return (
    <div className="bg-base-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center py-4 space-y-6 lg:space-y-0 mb-10">
      <div data-aos="zoom-in" data-aos-duration="1000">
        <img src={atomicHabit} className="w-3/4 mx-auto" alt="" />
      </div>
      <div className="space-y-2 text-center lg:text-left">
        <p className="p-2 bg-orange-500 w-24 mx-auto lg:mx-0 text-white rounded-md">
          FEATURED
        </p>
        <h1
          data-aos="zoom-in"
          data-aos-duration="1000"
          className="text-4xl font-semibold"
        >
          Atomic Habits will teach you how to make small changes that will
          transform your habits and deliver amazing results.
        </h1>
        <p>By: James Clear</p>
      </div>
      <div className="text-center space-y-2">
        <p className="text-3xl">$23.18</p>
        <button className="btn bg-green-600 text-white">Add to Cart</button>
      </div>
    </div>
  );
};

export default AtomicHabit;
