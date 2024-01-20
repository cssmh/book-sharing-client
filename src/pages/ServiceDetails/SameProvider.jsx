import axios from "axios";
import { useEffect, useState } from "react";
import SameProviderCard from "./SameProviderCard";
import ServiceCard from "../Services/ServiceCard";


const SameProvider = ({email,name,id}) => {

    const [services,setServices] = useState([]);
    const url = `http://localhost:5000/services?email=${email}`
    useEffect(()=>{
      axios.get(url)
      .then(res=>setServices(res.data))
      .then(err=>console.log(err))
    },[url])


   const filterServices = services.filter(service => service._id!==id);   
    return (
        <div>
             {
                services.length == 0 ? <></> :
                <div>
                   <h3 className="text-center my-10 font-bold text-2xl italic">Others services of {name}</h3>  
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {
                    filterServices.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                   }
                   </div>
                </div>
             }
        </div>
    );
};

export default SameProvider;