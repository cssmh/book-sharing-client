import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/Home/Home";
import Register from "../Components/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Profile from "../Components/Profile/Profile";
import Login from "../components/Login/Login";
import UpdateBook from "../Pages/MyBooks/UpdateBook";
import MySchedules from "../pages/MySchedules/MySchedules";
import MyBooks from "../Pages/MyBooks/MyBooks";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../pages/BookInfo/BookDetails";
import AddBook from "../pages/AddBook/AddBook";
import AdminPrivateRoute from "../AdminPrivateRoute/AdminPrivateRoute";
import SameProvider from "../Pages/SameProvider/SameProvider";
import AdminBooking from "../Components/Admin/AdminBooking/AdminBooking";

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
          fetch(`https://book-sharing-server.vercel.app/book/${params.id}`),
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
          fetch(`https://book-sharing-server.vercel.app/book/${params.id}`),
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
        path: "/admin-dashboard",
        element: (
          <AdminPrivateRoute>
            <AdminBooking />
          </AdminPrivateRoute>
        ),
        loader: () => fetch("https://book-sharing-server.vercel.app/allBooks"),
      },
    ],
  },
]);

export default Root;
