import pencil from "../assets/pencil.jpg";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import useBookProviders from "../Hooks/useBookProviders";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Count = () => {
  const axiosNoToken = useAxiosPublic();
  const { uniqueEmails, allBooks } = useBookProviders();
  const { ref, inView } = useInView({ triggerOnce: true });

  const { data: totalBookings } = useQuery({
    queryKey: ["totalBookings"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/total-bookings");
      return res.data?.result;
    },
  });

  return (
    <div
      ref={ref}
      className="hero min-h-[30vh]"
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
            <p className="text-gray-500">
              {inView && <CountUp end={allBooks?.length || 0} duration={3} />}
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
            <p className="text-gray-500">
              {inView && (
                <CountUp end={uniqueEmails?.length || 0} duration={3} />
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
            <p className="text-gray-500">
              {inView && <CountUp end={totalBookings || 0} duration={3} />}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Count;
