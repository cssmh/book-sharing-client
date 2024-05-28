import { Helmet } from "react-helmet-async";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="max-w-[1200px] mx-auto">
      <Helmet>
        <title>BookHaven | Admin Dashboard</title>
      </Helmet>
      <div className="flex flex-col md:flex-row gap-2">
        <div className="bg-yellow-500 md:min-h-screen p-5 text-white md:w-1/5">
          <div className="flex flex-col md:flex-col space-y-2">
            <Link to="/">
              <button className="btn btn-sm w-full md:w-auto">Home</button>
            </Link>
            <Link to="/admin-dashboard">
              <button className="btn btn-sm w-full md:w-auto">All Books</button>
            </Link>
            <Link to="/admin-dashboard/all-bookings">
              <button className="btn btn-sm w-full md:w-auto">
                All Bookings
              </button>
            </Link>
            <Link to="/admin-dashboard/books-provider">
              <button className="btn btn-sm w-full md:w-auto">
                Books Providers
              </button>
            </Link>
            <Link to="/admin-dashboard/user-new-book">
              <button className="btn btn-sm w-full md:w-auto">
                Users for New Book
              </button>
            </Link>
          </div>
        </div>
        <div className="md:w-4/5">
          <h1 className="ml-2 mt-2">Welcome Admin </h1>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
