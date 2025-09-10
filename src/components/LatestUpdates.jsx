import swal from "sweetalert";
import Banner from "../assets/notified.jpg";
import { postEmail } from "../Api/books";
import useDataQuery from "../Hooks/useDataQuery";

const LatestUpdates = () => {
  const { data, refetch } = useDataQuery(["userEmails"], "/emails");
  const existingEmails = data?.map((user) => user.email);
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();

    if (!emailRegex.test(email)) {
      return showAlert("Sorry", "Enter a valid email!", "error");
    }

    if (existingEmails?.includes(email)) {
      return showAlert(
        "Sorry",
        "This email has already been submitted!",
        "error"
      );
    }

    try {
      const res = await postEmail(email);
      if (res?.insertedId) {
        showAlert("Thank you", `We will update you via ${email}`, "success");
        refetch();
      }
    } catch {
      showAlert("Error", "An error occurred. Please try again later.", "error");
    }
  };

  const showAlert = (title, text, icon) => {
    swal({ title, text, icon, timer: 2000 });
  };

  return (
    <div
      className="text-white md:rounded-md md:mt-5"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100%",
        width: "100%",
      }}
    >
      <div className="backdrop-blur-sm px-5 md:px-16 py-12 md:py-20 rounded-xl">
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
              className="text-black rounded-xl w-full md:flex-grow px-4 py-2 focus:outline-none focus:border-transparent"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-sm text-white bg-green-400 rounded-xl hover:bg-blue-400 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LatestUpdates;
