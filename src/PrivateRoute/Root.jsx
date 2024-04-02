import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import Register from "../Components/Register/Register";
import PrivateRoute from "./PrivateRoute";
import Profile from "../Components/Profile/Profile";
import Login from "../components/Login/Login";
import UpdateBook from "../Pages/MyBooks/UpdateBook";
import MySchedules from "../pages/MySchedules/MySchedules";
import MyBooks from "../Pages/MyBooks/MyBooks";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookInfo/BookDetails";
import AddBook from "../pages/AddBook/AddBook";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import AdminBooking from "../Components/Admin/AdminBooking/AdminBooking";
import SameProvider from "../Pages/SameProvider/SameProvider";

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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
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
        loader: ({ params }) =>
          fetch(`http://localhost:5000/book/${params.id}`),
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
      {
        path: "/admin",
        element: (
          <AdminPrivateRoute>
            <AdminBooking />
          </AdminPrivateRoute>
        ),
        loader: () => fetch("http://localhost:5000/allBooks"),
      },
    ],
  },
]);

export default Root;
