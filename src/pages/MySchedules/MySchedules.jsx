import { useState } from "react";
import MyBookings from "./MyBookings";
import MyWorks from "./MyWorks";
import { Helmet } from "react-helmet-async";


const MySchedules = () => {
    const [activeComponent, setActiveComponent] = useState('MyBookings');

    const showBook = () => {
        setActiveComponent('MyBookings');
    }
    const showWork = () => {
        setActiveComponent('MyWorks');
    }
    return (
       <div>
        <Helmet>
            <title>BookHaven | My-Schedule</title>
        </Helmet>
         <div className="flex justify-center gap-4 my-6">
            <button onClick={showBook}  className={activeComponent === 'MyBookings' ? 'btn btn-primary text-white' : 'btn'}>My Booking</button>
            <button onClick={showWork}  className={activeComponent === 'MyWorks' ? 'btn btn-primary text-white' : 'btn'}>My Pending</button>
            </div>
            {activeComponent === 'MyBookings' && <MyBookings></MyBookings>}
            {activeComponent === 'MyWorks' && <MyWorks></MyWorks>}
       </div>
    );
};

export default MySchedules;