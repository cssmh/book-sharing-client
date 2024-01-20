import { useLoaderData } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const Services = () => {
    const services = useLoaderData();
   
    let searchTerm;


    const [isShow, setIsShow] = useState(false);
    const [showButton, setShowButton] = useState(true);

    const [filter, setFilter] = useState(services)
    // console.log(filter);  


    const handleButton = () => {
        setShowButton(!showButton);
        setIsShow(!isShow);

    }
    return (
        <div>
              <Helmet>
                <title>Home Care | Books</title>
            </Helmet>

            <div className="text-center my-6">


                <input type="text" name="name" placeholder="Search Here" className="input input-bordered w-80 border-red-500 "
                    onChange={(e) => {
                        searchTerm = e.target.value;
                        console.log(searchTerm);

                        if (searchTerm === '') {
                            setFilter(services);
                        }
                        else {
                            const searchItem = services.filter(service => service.service_name.toLowerCase().includes(searchTerm.toLowerCase()))
                            setFilter(searchItem);
                            
                        }

                    }}
                />

                <h2 className="mt-4 text-3xl font-bold italic">All Books Available for you</h2>
            </div>
            <p>{searchTerm}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
                {


                    // services
                    //     .filter((service) => {
                    //         if (searchTerm === '')
                    //             return service;
                    //         else if (service.service_name.toLowerCase().includes(searchTerm.toLowerCase()))
                    //             return service;
                    //     }).
                    //     map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)


                    isShow ? filter.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>) :
                    filter.slice(0,6).map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
            {
               ( services.length > 6 && filter.length!=0) && <div className="flex justify-center my-6">
                    {/* <button onClick={()=>setIsShow(!isShow)} className="btn bg-[#009444] text-white ">{isShow ? '' : "See All"}</button> */}
                    {showButton && <button onClick={handleButton} className="btn bg-[#009444] text-white ">See All</button>}
                </div>
            }

        </div>
    );
};

export default Services;