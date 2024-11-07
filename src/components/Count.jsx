import { useEffect, useState, useRef } from "react";
import pencil from "../assets/pencil.jpg";
import CountUp from "react-countup";
import useBookProviders from "../Hooks/useBookProviders";

const Count = () => {
  const { isLoading, bookProviders, totalBooks, totalBookings } =
    useBookProviders();

  const [inView, setInView] = useState(false);
  const countSectionRef = useRef(null);

  const checkInView = () => {
    if (countSectionRef.current) {
      // Check if the ref is not null
      const bounding = countSectionRef.current.getBoundingClientRect();
      if (bounding.top < window.innerHeight && bounding.bottom >= 0) {
        setInView(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkInView);
    return () => {
      window.removeEventListener("scroll", checkInView);
    };
  }, []);

  return (
    <div
      ref={countSectionRef}
      className="hero min-h-[30vh] mb-4"
      style={{
        backgroundImage: `url(${pencil})`,
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="grid grid-cols-1 md:grid-cols-3 text-4xl gap-8 lg:gap-52 2xl:gap-72">
          <div>
            <p className="text-red-500">Books</p>
            <p className={`${isLoading && "animate-pulse"} text-gray-500`}>
              {inView && <CountUp end={totalBooks || 0} duration={3} />}
            </p>
          </div>
          <div>
            <p className="text-green-500">Providers</p>
            <p className={`${isLoading && "animate-pulse"} text-gray-500`}>
              {inView && (
                <CountUp end={bookProviders?.length || 0} duration={3} />
              )}
            </p>
          </div>
          <div>
            <p className="text-blue-500">Bookings</p>
            <p className={`${isLoading && "animate-pulse"} text-gray-500`}>
              {inView && <CountUp end={totalBookings || 0} duration={3} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
