import pencil from "../../assets/pencil.jpg";
const Count = () => {
  return (
    <div
      className="hero min-h-[30vh]"
      style={{
        backgroundImage: `url(${pencil})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div
          data-aos="flip-up"
          data-aos-duration="1000"
          className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52"
        >
          <div>
            <p className="text-red-500">Books</p>
            <p className="text-gray-500">10</p>
          </div>
          <div>
            <p className="text-green-500">Author</p>
            <p className="text-gray-500">27</p>
          </div>
          <div>
            <p className="text-blue-500">User</p>
            <p className="text-gray-500">40</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
