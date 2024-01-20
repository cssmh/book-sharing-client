import { Link } from "react-router-dom";


const PopularServiceCard = ({ service }) => {
    const { _id, book_image, book_name, description, book_provider_image, book_provider_name, phone } = service;
    let smallDesc
     = description.slice(0, 50)
    return (
        
   
         <div className="card bg-yellow-50 hover:border-2  hover:border-blue-700 hover:bg-yellow-100 mx-1 md:mx-0">

            <div data-aos="zoom-in" data-aos-delay="400" data-aos-offset='100'>
            <figure className="px-10 pt-10 " >
                <img src={book_image} alt="Shoes" className="rounded-xl h-52" />
            </figure>
            </div>
           
            <div className="card-body items-center text-center">
                <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
                <p>{smallDesc}...</p>
                <div className="flex justify-center items-center gap-6 my-4 border-2 border-red-700 rounded-lg p-3">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100">
                            <img src={book_provider_image}/>
                        </div>
                    </div>
                    <h2 className=" italic font-bold text-lg ">{book_provider_name}</h2>
                </div>
               
               <p className="text-lg font-bold mb-4">Price : <span className="italic">{phone}</span></p>
                 <div className="card-actions">
                   <Link to={`/service/${_id}`}>
                    <button className="btn btn-outline btn-success">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
       
    );
};

export default PopularServiceCard;