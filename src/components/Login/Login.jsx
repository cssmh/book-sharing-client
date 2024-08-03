import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { TbFidgetSpinner } from 'react-icons/tb';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ResetPassModal from "./ResetPassModal";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(true);
  const [pass, setPass] = useState(false);
  const location = useLocation();
  const navigateTo = useNavigate();
  const { user, login, resetPassword, emailVerification, logOut, loading } =
    useAuth();

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

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (email == "Kona@mail.com" || email == "admin@admin.com") {
      login(email, password)
        .then(() => {
          toast.success("logged in successfully");
          navigateTo(location?.state || "/", { replace: true });
        })
        .catch(() => toast.error("Incorrect Password. Please try again"));
    } else {
      login(email, password)
        .then((res) => {
          if (!res?.user?.emailVerified) {
            emailVerification()
              .then(() => {
                toast.success("We sent you a verification email");
              })
              .catch();
            logOut().then().catch();
            toast.error("Verify your Email first please!");
            return;
          } else {
            toast.success("Logged in successfully");
            navigateTo(location?.state || "/", { replace: true });
          }
        })
        .catch(() => toast.error("Invalid user password. Try again"));
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please provide a valid email address");
      return;
    } else {
      resetPassword(email)
        .then(() => toast.success("Reset email sent to your mail."))
        .catch((err) => toast.error(err.message));
      setIsOpen(false);
    }
  };

  const handleChangePass = (e) => {
    if (e.target.value.length > 0) {
      setPass(true);
    } else {
      setPass(false);
    }
  };

  return (
    <div
      className="min-h-screen flex bg-base-200"
    >
      <Helmet>
        <title>BookHaven | Login</title>
      </Helmet>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="border max-w-sm w-full p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6">
            Sign in to your account
          </h2>
          <form onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm">
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-[10px] border border-gray-300 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={view ? "password" : "text"}
                  required
                  onChange={handleChangePass}
                  className="appearance-none rounded-md relative block w-full px-3 py-[10px] border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Password"
                />
                {pass && (
                  <span
                    className="absolute top-[37px] right-[10px] text-gray-500 cursor-pointer"
                    onClick={() => setView(!view)}
                  >
                    {view ? <FaRegEyeSlash /> : <FaRegEye />}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm">
                <a
                  onClick={() => setIsOpen(true)}
                  className="font-medium cursor-pointer text-gray-500"
                >
                  Forgot your password?
                </a>
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
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-green-400 font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
          <SocialLogin />
        </div>
      </div>
      <div className="hidden md:flex lg:w-1/2 bg-cover bg-center"></div>
      {isOpen && (
        <ResetPassModal
          closeModal={() => setIsOpen(false)}
          isOpen={isOpen}
          handleForgotPassword={handleForgotPassword}
        />
      )}
    </div>
  );
};

export default Login;
