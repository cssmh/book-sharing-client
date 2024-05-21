import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useContextHook from "../../useCustomHook/useContextHook";

const Register = () => {
  const [view, setView] = useState(true);
  const [viewConfirmPass, setViewConfirmPass] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const { user, createUser, handleUpdateProfile, emailVerification, logOut } =
    useContextHook();
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is already logged in, will redirect to home page
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

  // Confirm password validation function
  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword === "") {
      setConfirmPassError("");
    } else if (password === "") {
      setConfirmPassError("Insert your password first");
    } else if (confirmPassword !== password) {
      setConfirmPassError("Passwords do not match");
    } else {
      setConfirmPassError("");
      if (!passError && confirmPassword === password) {
        setPassSuccess("✔️ Good job! Passwords match and are strong");
      }
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    validatePassword(password);
    validateConfirmPassword(confirmPassword); // Re-validate confirm password when main password changes
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    validateConfirmPassword(confirmPassword);
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
    if (passError || confirmPassError) {
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
        // Introduce a 2-second delay before showing the toast error
        setTimeout(() => {
          toast.error("Sorry! Email verification Required");
          logOut().then().catch();
          navigateTo("/login");
        }, 2000);
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
        <div className="form-control relative">
          <label className="label">
            <span className="label-text font-semibold">Confirm Password</span>
          </label>
          <input
            type={viewConfirmPass ? "password" : "text"}
            required
            onChange={handleConfirmPasswordChange}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input input-bordered border-green-500 focus:border-transparent"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[51px] right-4 cursor-pointer"
            onClick={() => setViewConfirmPass(!viewConfirmPass)}
          >
            {viewConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <span className="text-red-500 text-[16px] font-normal mt-1 ml-3">
            {confirmPassError}
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
