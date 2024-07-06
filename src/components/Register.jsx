import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

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

  // Password validation function
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
        if (!user?.emailVerified) {
          logOut().then().catch();
          toast.error("Sorry! Email verification Required");
          navigateTo("/validation");
        } else {
          navigateTo(location?.state || "/");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div data-aos="zoom-in" className="bg-green-50 p-4 rounded-lg mx-2 md:mx-0">
      <Helmet>
        <title>BookHaven | Register</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center">Please Register</h2>
      <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label pt-0">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            type="text"
            required
            name="name"
            placeholder="Name"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="Photo URL"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
        </div>
        <div className="relative form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type={view ? "password" : "text"}
            required
            onChange={handlePasswordChange}
            name="password"
            placeholder="Password"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[51px] right-4 cursor-pointer"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <span
            className={`${
              passError.length > 0 ? "text-red-500" : "text-green-500"
            } text-[16px] font-normal mt-1 ml-3`}
          >
            {passError.length > 0 ? passError : passSuccess}
          </span>
        </div>
        <div className="form-control mt-5">
          <button className="btn border-green-400 hover:border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
            {loading ? (
              <LiaSpinnerSolid className="animate-spin text-lg" />
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
      <div className="text-center mt-3">
        Already have an account?{" "}
        <Link className="text-green-400 font-bold" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
