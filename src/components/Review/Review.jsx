import Reviewer1 from "../../assets/Reviewer1.png";
import Reviewer2 from "../../assets/Reviewer2.jpg";
import Reviewer3 from "../../assets/Reviewer3.jpeg";
import Reviewer4 from "../../assets/Reviewer4.jpg";

const Review = () => {
  return (
    <div className="max-w-[1220px] mx-auto flex flex-col lg:flex-row justify-center items-center gap-4 my-12">
      <div className="lg:w-2/5 text-center lg:text-left space-y-1 md:space-y-2">
        <p className="text-2xl md:text-[35px] font-semibold mx-2 md:mx-0">
          Hear from Happy <span className="text-green-400">Book Lovers</span>
        </p>
        <p className="text-gray-500 mt-1 font-semibold mx-4 md:mx-0">
          Discover the stories of satisfaction from our avid book lovers, as
          they share their experiences with our bookhaven.
        </p>
      </div>
      <div className="lg:w-3/5 grid md:grid-cols-2 gap-4 md:mx-2 lg:mx-0">
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="shadow-xl p-6 rounded-lg mx-2 md:mx-0"
        >
          <p className="font-medium text-gray-500 pb-2 hover:scale-105 transition-all duration-300 mb-[6px]">
            I am striving to improve the quality of services and books offered
            by this website. I am committed to attention to detail and
            excellence, aiming for unparalleled quality.
          </p>
          <div className="flex gap-2">
            <img
              src={Reviewer1}
              className="w-12 rounded-3xl"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div>
              <p className="font-semibold">Md. Momin Hossain</p>
              <p className="text-gray-500">Admin of BookHaven</p>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="shadow-xl p-6 rounded-lg mx-2 md:mx-0"
        >
          <p className="font-medium text-gray-500 pb-2 hover:scale-105 transition-all duration-300 mb-[6px]">
            Working with this web has been a pleasure. Their dedication to
            customer satisfaction is truly remarkable. I highly recommend their
            services.
          </p>
          <div className="flex gap-2">
            <img
              src={Reviewer2}
              className="w-12 rounded-3xl"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div>
              <p className="font-semibold">Sarah Johnson</p>
              <p className="text-gray-500">Happy Book Enthusiasts</p>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="shadow-xl p-6 rounded-lg mx-2 md:mx-0"
        >
          <p className="font-medium text-gray-500 pb-2 hover:scale-105 transition-all duration-300 mb-[6px]">
            The team at this web is not only professional but also incredibly
            friendly. They made our project a huge success and exceeded our
            expectations
          </p>
          <div className="flex gap-2">
            <img
              src={Reviewer3}
              className="w-12 rounded-3xl"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div>
              <p className="font-semibold">Sydney Sweeney</p>
              <p className="text-gray-500">Lovely Book Purchaser</p>
            </div>
          </div>
        </div>
        <div
          data-aos="zoom-in-up"
          data-aos-duration="1000"
          className="shadow-xl p-6 rounded-lg mx-2 md:mx-0"
        >
          <p className="font-medium text-gray-500 pb-2 hover:scale-105 transition-all duration-300 mb-[6px]">
            We have been partners with this web for years, and they have
            consistently delivered top-notch solutions. They truly understand
            our business needs.
          </p>
          <div className="flex gap-2">
            <img
              src={Reviewer4}
              className="w-12 rounded-3xl"
              onContextMenu={(e) => e.preventDefault()}
            />
            <div>
              <p className="font-semibold">Mahbubur Rahman</p>
              <p className="text-gray-500">Best Provider & Reader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
