import axios from "axios";
import Swal from "sweetalert2";


const MyWorksCard = ({ work }) => {
    console.log(work);
    const { _id, book_image, book_name, phone,instruction, status,date,user_email } = work;

    const handleStatus = (event,_id) =>{
       console.log(event.target.value,_id)
       const newStatus =  (event.target.value) ;
       const updatedStatus = {newStatus};
       
       axios.put(`http://localhost:5000/bookings/${_id}`,updatedStatus)
       .then(res=>{
        if (res.data.modifiedCount > 0) {
            Swal.fire({
                icon: 'success',
                title: 'Status Updated',

            })
        }
       })
       .then(err=>console.log(err))
    }
    return (
        <div className="card  bg-yellow-50 hover:border-2  hover:border-blue-700 hover:bg-yellow-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src={book_image} alt="Shoes" className="rounded-xl h-52" />
        </figure>
        <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-blue-900">{book_name}</h2>
           <p className="text-lg font-bold ">Phone : <span className="italic">{phone}</span></p>
           <p className="text-lg font-bold ">Instruction : <span className="italic">{instruction}</span></p>
           <p className="text-lg font-bold ">Email : <span className="">{user_email}</span></p>
           <p className="text-lg font-bold ">Need him/her in: <span className="italic">{date}</span></p>
      
          
                <select id="cars" name="book_name" defaultValue={status} onChange={()=>handleStatus(event,_id)} className="input input-bordered">
                            <option value="pending"><button className="btn btn-primary">Pending</button></option>
                            <option value="progress"><button className="btn btn-primary">Progress</button></option>
                            <option value="completed"><button className="btn btn-primary">Completed</button></option>
                        </select>
                        </div>
    </div>
    );
};

export default MyWorksCard;