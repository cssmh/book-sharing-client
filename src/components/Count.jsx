import pencil from "../assets/pencil.jpg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import useBookProviders from "../Hooks/useBookProviders";
import useQueryPublic from "../Hooks/useQueryPublic";

const Count = () => {
  const { isLoading, bookProviders, totalBooks } = useBookProviders();
  const { ref, inView } = useInView({ triggerOnce: true });

  const { isLoading: bookingLoading, data: totalBookings } = useQueryPublic(
    ["totalBookings"],
    "/total-bookings"
  );
  const loading = isLoading || bookingLoading;

  return (
    <div
      ref={ref}
      className="hero min-h-[30vh] mb-4"
      style={{
        backgroundImage: `url(${pencil})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52">
          <div>
            <p
              data-aos="flip-left"
              data-aos-duration="1000"
              className="text-red-500"
            >
              Books
            </p>
            <p className={`${loading && "animate-pulse"} text-gray-500`}>
              {inView && <CountUp end={totalBooks || 0} duration={3} />}
            </p>
          </div>
          <div>
            <p
              data-aos="flip-up"
              data-aos-duration="1000"
              className="text-green-500"
            >
              Providers
            </p>
            <p className={`${loading && "animate-pulse"} text-gray-500`}>
              {inView && (
                <CountUp end={bookProviders?.length || 0} duration={3} />
              )}
            </p>
          </div>
          <div>
            <p
              data-aos="flip-right"
              data-aos-duration="1000"
              className="text-blue-500"
            >
              Bookings
            </p>
            <p className={`${loading && "animate-pulse"} text-gray-500`}>
              {inView && (
                <CountUp end={totalBookings?.result || 0} duration={3} />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
