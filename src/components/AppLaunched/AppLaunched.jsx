import { useState } from "react";
import swal from "sweetalert";
import toast from "react-hot-toast";

const AppLaunched = () => {
  const [email, setEmail] = useState("");
  const emailCheck = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;

  const handleNotify = () => {
    if (!emailCheck.test(email)) {
      return toast.error("Enter valid email!");
    }
    swal("Thank you", `We will update you via ${email}`, "success");
  };
  return (
    <section className="w-full bg-white py-10">
      <div className="container relative flex flex-col px-6 py-8 mx-auto">
        <section className="flex items-center flex-1">
          <div className="flex flex-col w-full">
            <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
              <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 dark:from-teal-200 dark:via-indigo-300 dark:to-sky-500">
                Coming
              </span>
              <span className="text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 dark:from-sky-300 dark:via-pink-300 dark:to-red-500">
                Soon
              </span>
            </h1>
            <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-gray-700 dark:text-white md:text-xl">
              Unlock a new realm of possibilities with our upcoming app launch.
            </p>
            <div className="flex flex-col mt-8 space-y-3 md:-mx-2 md:flex-row md:justify-center md:space-y-0">
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 md:px-8 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
              <button
                onClick={handleNotify}
                className="px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-400 rounded-lg hover:bg-blue-400 focus:outline-none sm:mx-2"
              >
                Notify Me
              </button>
            </div>
            <p className="mt-5 text-center text-gray-700 dark:text-white text-base">
              Notify me when App is launched :)
            </p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AppLaunched;
