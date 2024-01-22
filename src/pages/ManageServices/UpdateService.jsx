import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";


const UpdateService = () => {
    const service = useLoaderData();
    const { user } = useContext(AuthContext);
    const { _id, book_image, book_name, description, book_provider_image, book_provider_name,location, phone } = service;

    const handleService = e => {
        e.preventDefault();
        const form = event.target;
        const book_name = form.book_name.value;
        const book_image = form.book_image.value;
        // const book_provider_name = form.book_provider_name.value;
        // const service_provider_email = form.service_provider_email.value;
        // const book_provider_image = form.book_provider_image.value;
        const location = form.location.value;
        const description = form.description.value;
        const phone = form.phone.value;
        const service = {
            location, book_name, book_image, description, phone
        }
        console.log(service);
        axios.put(`http://localhost:5000/services/${_id}`, service)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Details Updated',

                    })
                }
            })
            .then(err => console.log(err))
    }

    // Update book details form

    return (
        <div>
             <Helmet>
                <title>Update {book_name}</title>
            </Helmet>

            <form onSubmit={handleService} className=" md:w-3/4 lg:w-1/2 mx-auto">
            <div className="form-control">
                 <label className="label">
                    <span className="label-text">Book Name</span>
                 </label>
                <input id="cars" name="book_name" defaultValue={book_name} className="input input-bordered" />
               </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Book Image Url</span>
                    </label>
                    <input type="text" name="book_image" defaultValue={book_image} className="input input-bordered" />
                </div>
                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Provider Name</span>
                    </label>
                    <input type="text" readOnly name="book_provider_name" defaultValue={user?.displayName} className="input input-bordered" />
                </div> */}

                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Provide Email</span>
                    </label>
                    <input type="email" readOnly name="service_provider_email" defaultValue={user?.email} className="input input-bordered" />
                </div> */}

                {/* <div className="form-control">
                    <label className="label">
                        <span className="label-text">Service Provider Image </span>
                    </label>
                    <input type="text"  name="book_provider_image" defaultValue={book_provider_image} className="input input-bordered" />
                </div> */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input type="text" name="location" defaultValue={location} className="input input-bordered" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea name="description" defaultValue={description} cols="20" rows="10" className="rounded-lg"></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Phone</span>
                    </label>
                    <input type="text" name="phone" defaultValue={phone} className="input input-bordered" />
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-outline">Update Book Details</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateService;