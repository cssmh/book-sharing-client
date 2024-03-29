import { useLocation, useNavigate } from "react-router-dom";
import useContextHook from "../../useCustomHook/useContextHook";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const navigateTo = useNavigate();
  const location = useLocation();

  const { googleLogin } = useContextHook();
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
      <div className="divider max-w-2xl mx-auto italic">continue with</div>
      <div className="flex justify-around">
        <button onClick={handleSocialLogin} className="btn ">
          <FcGoogle className="text-2xl"></FcGoogle>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
