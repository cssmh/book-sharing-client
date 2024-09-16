import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAd from "../Hooks/useAd";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { saveUser } from "../Api/auth";
import BG from "../assets/login-background.avif";
import HavenHelmet from "./HavenHelmet";

const Register = () => {
  const [view, setView] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const { user, createUser, profileUpdate, verifyEmail, logOut } =
    useAuth();
  const admins = useAd();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.emailVerified || admins.includes(user?.email)) {
      navigate("/");
    }
  }, [user, admins, location, navigate]);

  const validatePassword = (password) => {
    if (!password) {
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
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image = form.get("photo") || import.meta.env.VITE_Default_URL;
    const email = form.get("email");
    const password = form.get("password");

    if (passError) {
      setLoading(false);
      return;
    }

    try {
      const res = await createUser(email, password);
      if (res?.user) {
        await saveUser(res.user);
        await profileUpdate(name, image);
        await verifyEmail();
        toast.success(
          "Register success! Check your inbox for a verification email!"
        );

        if (!res.user.emailVerified) {
          await logOut();
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        toast.error("User creation failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const style = {
    backgroundImage: `url(${BG})`,
    backgroundSize: "cover",
    minHeight: "100vh",
  };

  return (
    <div style={style} className="min-h-screen flex bg-base-200">
      <HavenHelmet title="Register" />
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div
          data-aos="zoom-in"
          className="border max-w-[400px] w-full p-6 rounded-lg shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-5">
            Create your account
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-lg block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Name"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Photo URL
              </label>
              <input
                id="photo"
                name="photo"
                type="text"
                className="appearance-none rounded-lg block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Photo URL"
              />
            </div>
            <div className="mb-3">
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
                className="appearance-none rounded-lg block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative mb-3">
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
                value={password}
                onChange={handlePasswordChange}
                className="appearance-none rounded-md block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Password"
              />
              <span
                className="absolute top-9 right-2 text-gray-700 cursor-pointer"
                onClick={() => setView(!view)}
              >
                {view ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
              <div className="min-h-[1.5rem] mb-[6px] mt-[2px]">
                <span
                  className={`text-sm font-normal ${
                    passError ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {passError || passSuccess}
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400"
                disabled={loading}
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="mt-5 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-400 font-semibold">
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
