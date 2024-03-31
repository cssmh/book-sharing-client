import Reader from "../../assets/Reader.png";
const BestSelling = () => {
  return (
    <div className="my-12 max-w-[1220px] mx-auto">
      <p className="font-semibold text-center lg:text-left">
        AUTHOR BEST SELLING
      </p>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-3/4 text-center lg:text-right space-y-5 lg:mr-5 px-3">
          <p className="text-3xl md:text-6xl text-orange-500">
            Mern Stack <br></br> Development
          </p>
          <p>MONGODB, EXPRESS.JS, REACT.JS, and NODE.JS</p>
          <p className="text-gray-500 mx-2 lg:mx-0">
            The MERN stack is a popular web development framework consisting of
            four key technologies: MongoDB, Express.js, React.js, and Node.js.
            MongoDB is a NoSQL database that offers flexibility and scalability,
            allowing developers to store data in JSON-like documents. Express.js
            is a web application framework for Node.js that simplifies the
            process of building web applications and APIs by providing a robust
            set of features. React.js is a JavaScript library for building user
            interfaces, developed by Facebook. It enables developers to create
            dynamic, interactive UIs with ease, using reusable components.
            Node.js is a server-side JavaScript runtime that allows developers
            to build scalable and high-performance web applications. It provides
            an event-driven architecture and a rich ecosystem of libraries and
            modules. Together, these technologies form a powerful and efficient
            stack for building modern web applications. MERN stack is
            particularly popular for its simplicity, flexibility, and
            performance, making it a preferred choice for developers building
            full-stack JavaScript applications.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="1000"
          className="lg:w-1/4 mx-auto mt-5 lg:mt-0"
        >
          <img src={Reader} className="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
