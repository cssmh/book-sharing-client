import toast from "react-hot-toast";
import SocialLogin from "./SocialLogin";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ResetPassModal from "./ResetPassModal";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState(true);
  const location = useLocation();
  const navigateTo = useNavigate();
  const { user, login, resetPassword, emailVerification, logOut, loading } =
    useAuth();
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    // If user is already logged in, will redirect to home page
    if (
      user?.emailVerified ||
      user?.email == "kona@mail.com" ||
      user?.email == "admin@admin.com"
    ) {
      toast.success("You already logged in");
      navigateTo("/");
    }
  }, [user?.emailVerified, user?.email, navigateTo]);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    // if condition because of custom gmail login without verification
    if (email == "Kona@mail.com" || email == "admin@admin.com") {
      login(email, password)
        .then(() => {
          toast.success("logged in success");
          navigateTo(location?.state || "/", { replace: true });
        })
        .catch(() => toast.error("Incorrect Password. Please try again"));
    } else {
      login(email, password)
        .then((res) => {
          // No way login if not verified
          if (!res?.user?.emailVerified) {
            emailVerification()
              .then(() => {
                toast.success("We sent you a verification email");
              })
              .catch();
            logOut().then().catch();
            toast.error("Verify your Email first please!");
            return;
            // No way login if not verified end
          } else {
            toast.success("logged in success");
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
      toast.error("Please Provide a valid email address");
      return;
    } else {
      resetPassword(email)
        .then(() => toast.success("reset email sent to your mail."))
        .catch((err) => toast.error(err.message));
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-green-50 p-7 md:p-9 rounded-lg">
      <Helmet>
        <title>BookHaven | Login</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center">Please Login</h2>
      <form onSubmit={handleLogin} className=" md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            required
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            placeholder="Password"
            required
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[51px] right-4"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <label className="label">
            <a
              onClick={() => setIsOpen(true)}
              type="button"
              className="label-text-alt link link-hover text-sm"
            >
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-4">
          <button className="btn border-green-400 hover:border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
            {loading ? (
              <LiaSpinnerSolid className="animate-spin text-lg" />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        Do not have an account?{" "}
        <Link
          state={location.state}
          className="text-green-400 font-bold"
          to="/register"
        >
          Register
        </Link>
      </div>
      <SocialLogin></SocialLogin>
      <ResetPassModal
        closeModal={closeModal}
        isOpen={isOpen}
        handleForgotPassword={handleForgotPassword}
      ></ResetPassModal>
    </div>
  );
};

export default Login;
