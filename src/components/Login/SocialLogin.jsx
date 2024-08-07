import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const SocialLogin = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { googleLogin } = useAuth();
  
  const handleSocialLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("User logged in success");
        navigateTo(location?.state ? location.state : "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="divider max-w-2xl mx-auto italic">or</div>
      <div className="flex justify-around">
        <button
          className="flex items-center gap-2 bg-green-200 text-black px-4 py-2 rounded-lg"
          onClick={handleSocialLogin}
        >
          <FcGoogle className="text-2xl"></FcGoogle>{" "}
          <span>Continue with Google</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
