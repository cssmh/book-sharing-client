import banner1 from "../../assets/1.jpeg";
import banner2 from "../../assets/2.jpeg";
import banner3 from "../../assets/3.jpeg";

const Banner = () => {
  return (
    <div data-aos="zoom-in" className="carousel w-full rounded-sm">
      <div id="slide1" className="carousel-item relative w-full">
        <img src={banner1} className="w-full rounded-md" />
        <div className="absolute flex transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide3" className="btn btn-sm md:btn-md btn-circle btn-primary mr-5">
            ❮
          </a>
          <a href="#slide2" className="btn btn-sm md:btn-md btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full rounded-lg">
        <img src={banner2} className="w-full rounded-md" />
        <div className="absolute flex transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide1" className="btn btn-sm md:btn-md btn-circle btn-primary mr-5">
            ❮
          </a>
          <a href="#slide3" className="btn btn-sm md:btn-md btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full rounded-lg">
        <img src={banner3} className="w-full rounded-md" />
        <div className="absolute flex transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href="#slide2" className="btn btn-sm md:btn-md btn-circle btn-primary mr-5">
            ❮
          </a>
          <a href="#slide1" className="btn btn-sm md:btn-md btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
