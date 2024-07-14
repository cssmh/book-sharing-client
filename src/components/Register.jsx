import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import BgLogin from "../assets/loginBg.jpg";

const Register = () => {
  const [view, setView] = useState(true);
  const [password, setPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const navigateTo = useNavigate();
  const location = useLocation();
  const {
    user,
    createUser,
    handleUpdateProfile,
    emailVerification,
    logOut,
    loading,
  } = useAuth();

  useEffect(() => {
    if (
      user?.emailVerified ||
      user?.email === "kona@mail.com" ||
      user?.email === "admin@admin.com"
    ) {
      toast.success("You are already logged in");
      navigateTo("/");
    }
  }, [user?.emailVerified, user?.email, navigateTo]);

  const validatePassword = (password) => {
    if (password === "") {
      setPassError("");
      setPassSuccess("");
    } else if (password.length < 6) {
      setPassError("Make your password at least 6 characters long");
      setPassSuccess("");
    } else if (!/[A-Z]/.test(password)) {
      setPassError("Add at least one uppercase letter");
      setPassSuccess("");
    } else {
      setPassError("");
      setPassSuccess("✔️ Good job! Strong password");
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    validatePassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image = form.get("photo");
    const defaultImage =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const photo = image || defaultImage;
    const email = form.get("email");

    if (passError) {
      return;
    }

    createUser(email, password)
      .then(() => {
        handleUpdateProfile(name, photo).then(() => {
          emailVerification().then(() =>
            toast.success(
              "Register success! Check your inbox for a verification email!"
            )
          );
        });
        logOut().then().catch();
        toast.error("Sorry! Email verification Required");
        navigateTo("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div
      style={{ backgroundImage: `url(${BgLogin})` }}
      className="min-h-screen flex"
    >
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="border max-w-[420px] w-full p-6 rounded-lg shadow-2xl">
          <Helmet>
            <title>BookHaven | Register</title>
          </Helmet>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Create your account
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL
              </label>
              <input
                id="photo"
                name="photo"
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Photo URL"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={view ? "password" : "text"}
                required
                onChange={handlePasswordChange}
                className="appearance-none rounded-md relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Password"
              />
              <span
                className="absolute top-9 right-2 text-gray-500 cursor-pointer"
                onClick={() => setView(!view)}
              >
                {view ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
              <div className="min-h-[1.5rem] mb-[6px] mt-[2px]">
                <span
                  className={`${
                    passError.length > 0 ? "text-red-600" : "text-green-600"
                  } text-[15px] font-normal mt-4`}
                >
                  <p>{passError.length > 0 ? passError : passSuccess}</p>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400"
              >
                {loading ? (
                  <LiaSpinnerSolid className="animate-spin text-xl" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
          <div className="mt-5 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-400 font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:w-1/2 bg-cover bg-center">
        {/* Optional: Add additional content or decorations here */}
      </div>
    </div>
  );
};

export default Register;
