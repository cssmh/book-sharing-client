import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Shared/MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register";
import PrivateRoute from "../Shared/PrivateRoute/PrivateRoute";
import MyProfile from "../components/MyProfile/MyProfile";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookDetails/BookDetails";
import AddBook from "../pages/AddBook/AddBook";
import MyBooks from "../pages/MyBooks/MyBooks";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import MySchedules from "../pages/MySchedules/MySchedules";
import SameProvider from "../pages/SameProvider/SameProvider";
import AdminRoute from "../Shared/PrivateRoute/AdminRoute";
import AdminDashboard from "../Dashboard/AdminDashboard";
import AllBooksCols from "../Dashboard/AllBooksCols";
import AllBookings from "../Dashboard/AllBookings";
import BooksProviders from "../Dashboard/BooksProviders";
import NotifyUser from "../Dashboard/NotifyUser";
import UserAnalytics from "../Components/UserAnalytics";

const Root = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "//user-analytics",
        element: (
          <PrivateRoute>
            <UserAnalytics />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/book/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-book",
        element: (
          <PrivateRoute>
            <AddBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-books",
        element: (
          <PrivateRoute>
            <MyBooks />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-schedules",
        element: (
          <PrivateRoute>
            <MySchedules />
          </PrivateRoute>
        ),
      },
      {
        path: "/provider/:email",
        element: (
          <PrivateRoute>
            <SameProvider />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <AdminDashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin-dashboard",
        element: <AllBooksCols />,
      },
      {
        path: "/admin-dashboard/all-bookings",
        element: <AllBookings />,
      },
      {
        path: "/admin-dashboard/books-provider",
        element: <BooksProviders />,
      },
      {
        path: "/admin-dashboard/user-new-book",
        element: <NotifyUser />,
      },
    ],
  },
]);

export default Root;
