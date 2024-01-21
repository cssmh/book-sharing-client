import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const AddService = () => {

    const { user} = useContext(AuthContext);
    const handleAddService = e =>{
        e.preventDefault();
        const form = event.target;
        const book_name = form.book_name.value;
        const book_image = form.book_image.value;
        const book_provider_name = form.book_provider_name.value;
        const book_provider_email = form.book_provider_email.value;
        const book_provider_image = user.photoURL;
        const location = form.location.value;
        const description = form.description.value;
        const phone = form.phone.value;

        const service ={
            location,book_name,book_image,book_provider_email,book_provider_name,description,phone,book_provider_image
        }

        console.log(service);
        axios.post('http://localhost:5000/services',service)
        .then(res=>{
           console.log(res.data);
           if (res.data.insertedId) {
               Swal.fire({
                   icon: 'success',
                   title: 'Book added',

               })
           }
        })
        .then(err=>{
           console.log(err);
        })
    }
    return (
        <div>
            <Helmet>
                <title>BookHaven | Add-Book</title>
            </Helmet>
            <form onSubmit={handleAddService} className=" md:w-3/4 lg:w-1/2 mx-auto">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Name</span>
                    </label>
                        <input type="text" name="book_name" className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Image Url</span>
                    </label>
                    <input type="text"  required name="book_image"  className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Provider Name</span>
                    </label>
                    <input type="text" name="book_provider_name"  defaultValue={user?.displayName} className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Provider Email</span>
                    </label>
                    <input type="email" readOnly name="book_provider_email" defaultValue={user?.email} className="input input-bordered" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" required name="location" className="input input-bordered" />
                </div>


                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea name="description" required cols="20" rows="10" className="rounded-lg"></textarea>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone Number</span>
                    </label>
                    <input type="text" required defaultValue={'+880'} name="phone"  className="input input-bordered" />
                </div>



                <div className="form-control mt-6">
                    <button className="btn btn-primary">Add Book</button>
                </div>
            </form>
        </div>
    );
};

export default AddService;