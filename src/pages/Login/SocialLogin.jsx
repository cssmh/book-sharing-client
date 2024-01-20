import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProviders";

import { FcGoogle} from 'react-icons/fc';
import { ToastContainer, toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SocialLogin = () => {
    const navigate = useNavigate()
    const location = useLocation();

    

    const { user, googleLogin} = useContext(AuthContext);
   
   
  


    const handleSocialLogin = (media) => {
        media()
            .then(res => {
                toast('User logged in successfully');
                navigate(location?.state ? location.state : '/')
            })
            .catch(error => {
                toast.error(error.message)
            })
    }

    return (
        <>
            <div className="divider max-w-2xl mx-auto italic">continue with</div>
            <div className="flex justify-around">
                <button
                    onClick={() => handleSocialLogin(googleLogin)}
                    className="btn "><FcGoogle className="text-2xl"></FcGoogle></button>

            </div>
        </>
    );
};

export default SocialLogin;