import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import axios from "axios";
import MyWorksCard from "./MyWorksCard";


const MyWorks = () => {
    const {user} = useContext(AuthContext);
    const [works,setWorks] = useState([])

    const url = `https://book-sharing-server.vercel.app/works?email=${user.email}`
    useEffect(()=>{
      axios.get(url)
      .then(res=>setWorks(res.data))
      .then(err=>console.log(err))
    },[url])

  // My pending page

    return (
        <div>
           <h2 className="text-center text-2xl my-10 font-semibold italic">User Booked Your Book</h2>
           {
             works.length == 0 ? <p className="text-center text-2xl font-semibold italic">No User Book Your Books</p>:  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
              {
                works.map(work => <MyWorksCard key={work._id} work={work}></MyWorksCard>)
              }
             </div>
           }
        </div>
    );
};

export default MyWorks;