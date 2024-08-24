import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { saveUser } from "../Api/auth";
import HavenHelmet from "./HavenHelmet";
import BG from "../assets/sign-bg.jpg";

const Register = () => {
  const [view, setView] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const location = useLocation();
  const navigateTo = useNavigate();
  const { user, createUser, handleUpdateProfile, emailVerification, logOut } =
    useAuth();

  useEffect(() => {
    if (
      user?.emailVerified ||
      user?.email === "kona@mail.com" ||
      user?.email === "admin@admin.com"
    ) {
      navigateTo("/");
    }
  }, [user?.emailVerified, user?.email, location?.pathname, navigateTo]);

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
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
    setIsPasswordEntered(passwordValue.length > 0);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const image =
      form.get("photo") ||
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const email = form.get("email");
    const password = form.get("password");

    if (passError) return;

    try {
      const res = await createUser(email, password);
      if (res?.user) {
        await saveUser(res.user);
        try {
          await handleUpdateProfile(name, image);
          await emailVerification();
          toast.success(
            "Register success! Check your inbox for a verification email!"
          );

          if (!res.user.emailVerified) {
            await logOut();
            navigateTo("/login");
          } else {
            navigateTo("/");
          }
        } catch (profileError) {
          toast.error("Profile update failed. Please try again.");
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
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div style={style} className="min-h-screen flex bg-base-200 text-white">
      <HavenHelmet title={"Register"} />
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
                className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Photo URL"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
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
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
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
                className="appearance-none rounded-md relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Password"
              />
              {isPasswordEntered && (
                <span
                  className="absolute top-9 right-2 text-gray-500 cursor-pointer"
                  onClick={() => setView(!view)}
                >
                  {view ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              )}
              <div className="min-h-[1.5rem] mb-[6px] mt-[2px]">
                <span
                  className={`${
                    passError ? "text-red-600" : "text-green-600"
                  } text-sm font-normal mt-4`}
                >
                  <p>{passError || passSuccess}</p>
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-400"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin text-xl" />
                ) : (
                  "Register"
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
