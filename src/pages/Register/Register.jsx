import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
// import toast from "react-hot-toast";
import { ToastContainer, toast,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet-async";
import { sendEmailVerification } from "firebase/auth";


const Register = () => {

    const {createUser , handleUpdateProfile} = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();

    console.log(location);

    const handleRegister = e => {
        e.preventDefault();
        const form =new FormData(e.currentTarget);
        const name = form.get('name');
        const photo = form.get('photo');
        const email = form.get('email');
        const password = form.get('password');
        console.log(name,photo,email,password);
       
        if(!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{6,}$/.test(password)){
            // swal("Oops!", "Password Atleast 6,one uppercase,one special character", "error");
            toast('password must be at least 6 characters including one uppercase and special character');
            return;
        }



        createUser(email,password)
        .then(res => {
            console.log(res.user);
            handleUpdateProfile(name, photo)
                .then(() => {
                    // swal("User Created Successfully","success");
                    toast("User Created Successfully")
                    navigate(location?.state ? location.state : '/')

                })
                sendEmailVerification(res.user)
                .then(console.log("verification sent"))
                .catch(err => {
                    console.log(err.message);
                })
        })
        .catch(error =>{
            console.log(error.message)
            // swal("Oops!", "Email Already Registered", "error");
            toast("Email Already Registered")
        })
     
     }
    return (
        <div className="bg-green-50 p-5 rounded-lg">
             <Helmet>
        <title>Book Share | Register</title>
    </Helmet>
        <h2 className="text-3xl font-bold italic text-center">Please Register</h2>
        <form onSubmit={handleRegister} className=" md:w-3/4 lg:w-1/2 mx-auto">
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Name</span>
                </label>
                <input type="text" required name="name" placeholder="Name" className="input input-bordered  border-green-500" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Photo URL</span>
                </label>
                <input type="text" required name="photo" placeholder="Photo URL" className="input input-bordered  border-green-500" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Email</span>
                </label>
                <input type="email" required name="email" placeholder="Email" className="input input-bordered  border-green-500" />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text font-semibold">Password</span>
                </label>
                <input type="password" required name="password" placeholder="Password" className="input input-bordered  border-green-500" />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div className="form-control mt-6">
                <button className="btn btn-success btn-outline">Register</button>
            </div>
        </form>
        <p className="text-center mt-4">Already have an account? <Link className="text-blue-600 font-bold" to="/login">Login</Link></p>
        <ToastContainer />
    </div>
        
    );
};

export default Register;