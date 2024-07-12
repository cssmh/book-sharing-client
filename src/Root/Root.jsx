import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Shared/MainLayout/MainLayout";
import ErrorPage from "../components/ErrorPage";
import Home from "../components/Home";
import Login from "../components/Login/Login";
import Register from "../components/Register";
import PrivateRoute from "../Shared/PrivateRoute/PrivateRoute";
import MyProfile from "../components/MyProfile/MyProfile";
import AllBooks from "../Pages/AllBooks/AllBooks";
import BookDetails from "../Pages/BookDetails/BookDetails";
import AddBook from "../pages/AddBook/AddBook";
import MyBooks from "../pages/MyBooks/MyBooks";
import UpdateBook from "../pages/UpdateBook/UpdateBook";
import MySchedules from "../pages/MySchedules/MySchedules";
import SameProvider from "../pages/SameProvider/SameProvider";
import DashLayout from "../Dashboard/DashLayout";
import AllBooksCols from "../Dashboard/AllBooksCols";
import AllBookings from "../Dashboard/AllBookings";
import BooksProviders from "../Dashboard/BooksProviders";
import UserToUpdate from "../Dashboard/UserToUpdate";
import DashHome from "../Dashboard/DashHome";

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
        path: "/update-book/:id",
        element: (
          <PrivateRoute>
            <UpdateBook />
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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashLayout />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <DashHome />,
          },
          {
            path: "/dashboard/all-books",
            element: <AllBooksCols />,
          },
          {
            path: "/dashboard/my-books",
            element: (
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/my-schedules",
            element: (
              <PrivateRoute>
                <MySchedules />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/all-bookings",
            element: <AllBookings />,
          },
          {
            path: "/dashboard/books-providers",
            element: <BooksProviders />,
          },
          {
            path: "/dashboard/users-to-update",
            element: <UserToUpdate />,
          },
        ],
      },
    ],
  },
]);

export default Root;
