import Reader from "../../assets/Reader.png";
import book1 from "../../assets/Book1.jpg";
import book2 from "../../assets/Book2.jpg";
import book3 from "../../assets/Book3.jpg";
import book4 from "../../assets/Book4.jpg";
const BestSelling = () => {
  return (
    <div className="my-12 max-w-7xl mx-auto">
      <p className="font-semibold text-center lg:text-left">
        AUTHOR BEST SELLING
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-0">
        <div
          data-aos="flip-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="900"
          className="text-center lg:text-right space-y-5 lg:mr-5 px-3"
        >
          <p className="text-7xl text-orange-500">
            Mern<br></br> Stack
          </p>
          <p>MONGODB, EXPRESS.JS, REACT.JS, and NODE.JS</p>
          <p className="text-gray-500">
            MongoDB is a NoSQL database that stores data in flexible, JSON-like
            documents, making it ideal for handling large volumes of structured
            or unstructured data. Express.js is a minimalist web application
            framework for Node.js that simplifies the process of building web
            applications and APIs by providing a robust set of features for
            routing, middleware, and HTTP utility methods. React.js is a
            JavaScript library for building user interfaces, developed by
            Facebook. It enables developers to create reusable UI components
            that efficiently update and render data changes. Node.js is a
            JavaScript runtime built on Chrome V8 JavaScript engine, allowing
            developers to run JavaScript code outside of a web browser.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-center"
          data-aos-duration="1000"
        >
          <img src={Reader} className="rounded-md mx-auto lg:mx-0" alt="" />
        </div>
        <div
          // data-aos="flip-right"
          // data-aos-easing="ease-out-cubic"
          // data-aos-duration="900"
          className="grid grid-cols-2 gap-7 mx-4 lg:mx-0"
        >
          <img src={book1} className="rounded-md" alt="" />
          <img src={book2} className="rounded-md" alt="" />
          <img src={book3} className="rounded-md" alt="" />
          <img src={book4} className="rounded-md" alt="" />
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
