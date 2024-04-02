import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextHook from "../../useCustomHook/useContextHook";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Register = () => {
  const [view, setView] = useState(true);
  const [passError, setPassError] = useState("");
  const { user, createUser, handleUpdateProfile, emailVerification, logOut } =
    useContextHook();
  const navigateTo = useNavigate();
  const location = useLocation();

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

  // Password condition now handling using onchange
  const handleEyeOnPassword = (e) => {
    const getPassword = e.target.value;
    if (getPassword === "") {
      setPassError("");
    } else if (getPassword.length < 6) {
      setPassError(
        "Make your password at least 6 character and one Uppercase letter!"
      );
    } else if (!/[A-Z]/.test(getPassword)) {
      setPassError("Add at least one Uppercase letter");
    } else {
      setPassError("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");

    const get_image = form.get("photo");
    const defaultImageUrl =
      "https://raw.githubusercontent.com/cssmh/bookhaven-client/main/src/assets/default.jpg";
    const photo = get_image.trim() !== "" ? get_image : defaultImageUrl;

    const email = form.get("email");
    const password = form.get("password");
    // console.log(name, photo, email, password);
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
        navigateTo(location?.state ? location.state : "/");
        // Introduce a 1.7-second delay before showing the toast error
        setTimeout(() => {
          toast.error("Sorry! Email verification Required");
          logOut().then().catch();
          navigateTo("/login");
        }, 1700);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div data-aos="zoom-in" className="bg-green-50 p-5 rounded-lg mx-2 md:mx-0">
      <Helmet>
        <title>BookHaven | Register</title>
      </Helmet>
      <h2 className="text-3xl font-bold italic text-center">Please Register</h2>
      <form onSubmit={handleRegister} className="md:w-3/4 lg:w-1/2 mx-auto">
        <div className="form-control">
          <label className="label">
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
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            type={view ? "password" : "text"}
            required
            onChange={handleEyeOnPassword}
            name="password"
            placeholder="Password"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[51px] right-4"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <span className="text-red-500 text-[16px] font-normal mt-1 ml-3">
            {passError}
          </span>
        </div>
        <div className="form-control mt-5">
          <button className="btn border-green-400 hover:border-green-400 bg-base-100 hover:bg-green-400 text-green-400 hover:text-white">
            Register
          </button>
        </div>
      </form>
      <div className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-green-400 font-bold" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
