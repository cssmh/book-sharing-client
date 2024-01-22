import { Link, useLoaderData } from "react-router-dom";
import AddBookings from "./AddBookings";
import SameProvider from "./SameProvider";
import { Helmet } from "react-helmet-async";


const ServiceDetails = () => {
    const service = useLoaderData();
    console.log(service);
    const { _id, book_image, book_name, description, location, book_provider_image, book_provider_email, book_provider_name, phone} = service;

    // Book Details Page

    return (
        <div>
            <Helmet>
                <title>{book_name}</title>
            </Helmet>

            {/* <h2>{book_provider_name}</h2>
             <img src={book_provider_image} alt="" /> */}

            <div className="card max-w-xl mx-auto bg-amber-100 shadow-xl p-6 my-6">
            <h2 className="text-center font-bold text-3xl italic text-blue-800">Book Provider Information</h2>
                <figure className="px-10 pt-10">
                    <img className="rounded-xl w-24" src={book_provider_image} alt="no image"  />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-xl text-orange-500 font-bold">
                        Name : {book_provider_name}</h2>
                    <p className="text-lg font-medium">Email: {book_provider_email}</p>
                    <p className="text-lg font-medium">Location: {location}</p>
                    <p className="text-lg font-medium">Phone: <span className="text-green-600">{phone}</span></p>
                </div>
            </div>


            <div className="card bg-yellow-50 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={book_image} alt="Shoes" className="rounded-xl w-[380px]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl  font-bold text-blue-900">{book_name}</h2>
                <p>{description}</p>
                 <div className="card-actions mt-2">
                    <AddBookings service={service}></AddBookings>
                </div>
            </div>
        </div>


        {/* <div>
            <SameProvider email = {book_provider_email} name={book_provider_name} id={_id}></SameProvider>
        </div> */}

                          
        </div>
    );
};

export default ServiceDetails;