import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { saveUser } from "../../Api/auth";

const SocialLogin = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { googleLogin } = useAuth();

  const handleSocialLogin = async () => {
    try {
      const res = await googleLogin();
      toast.success("User logged in successfully");
      navigateTo(location?.state || "/");
      await saveUser(res?.user);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(`Login failed: ${errorMessage}`);
    }
  };

  return (
    <div className="text-center">
      <div className="divider max-w-2xl mx-auto italic">or</div>
      <button
        className="flex items-center gap-2 bg-green-200 text-black px-4 py-2 rounded-lg mx-auto mt-4"
        onClick={handleSocialLogin}
      >
        <FcGoogle className="text-2xl" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
