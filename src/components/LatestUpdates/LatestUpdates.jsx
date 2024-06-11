import swal from "sweetalert";
import Banner from "../../assets/Notified.jpg";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const BannerImg = {
  backgroundImage: `url(${Banner})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const emailCheck = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
const LatestUpdates = () => {
  const axiosNoToken = useAxiosPublic();

  const { data: userEmails, refetch } = useQuery({
    queryKey: ["userEmails"],
    queryFn: async () => {
      const res = await axiosNoToken.get("/emails");
      return res.data?.map((user) => user?.email);
    },
  });

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!emailCheck.test(email)) {
      return toast.error("Enter a valid email!");
    }

    if (userEmails.includes(email)) {
      return toast.error("This email has already been submitted!");
    }

    axiosNoToken.post("/email", { email }).then((res) => {
      if (res.data?.insertedId) {
        swal({
          title: "Thank you",
          text: `We will update you via ${email}`,
          icon: "success",
          timer: 2000,
        });
        refetch();
      }
    });
  };

  return (
    <div
      className="text-white rounded-lg max-w-[1300px] mx-auto"
      style={BannerImg}
    >
      <div className="backdrop-blur-sm px-16 py-20 rounded-2xl">
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          <h1 className="w-full md:w-[60%] text-2xl md:text-4xl font-semibold text-center md:text-left">
            Subscribe to our Bookhaven for the latest book updates
          </h1>
          <form
            className="w-full md:w-[40%] flex items-center"
            onSubmit={handleSubmitEmail}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter Your Email Here"
              className="text-black rounded-xl w-full md:flex-grow px-4 py-2 focus:border-transparent"
              style={{ outline: "none" }}
            />
            <button className="ml-2 px-4 py-2 text-sm text-white bg-green-400 rounded-xl hover:bg-blue-400">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
