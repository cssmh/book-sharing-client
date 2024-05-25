import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="flex gap-2">
        <div className="w-1/5 bg-yellow-500 min-h-screen px-5 py-10 text-white">
          <div className="flex flex-col space-y-2">
            <Link to="/">
              <button className="btn btn-sm">Home</button>
            </Link>
            <Link to="/admin">
              <button className="btn btn-sm">All Books</button>
            </Link>
            <Link to="/admin/all-bookings">
              <button className="btn btn-sm">All Bookings</button>
            </Link>
            <Link to="">
              <button className="btn btn-sm">Books Providers</button>
            </Link>
          </div>
        </div>

        <div className="w-4/5">
          <h1 className="ml-2 mt-2">Welcome Admin </h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
