import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Shared/MainLayout/MainLayout";
import ErrorPage from "../Components/ErrorPage";
import Home from "../Components/Home";
import Login from "../Components/Login/Login";
import Register from "../Components/Register";
import PrivateRoute from "../Shared/PrivateRoute/PrivateRoute";
import MyProfile from "../Components/MyProfile";
import AllBooks from "../Pages/AllBooks";
import BookDetails from "../Pages/BookDetails";
import AddBook from "../Pages/AddBook";
import MyBooks from "../Pages/MyBooks";
import UpdateBook from "../Pages/UpdateBook";
import MySchedules from "../Pages/MySchedules";
import DashLayout from "../Dashboard/DashLayout";
import AdminBooks from "../Dashboard/AdminBooks";
import AllBookings from "../Dashboard/AllBookings";
import BooksProviders from "../Dashboard/BooksProviders";
import UserToUpdate from "../Dashboard/UserToUpdate";
import DashHome from "../Dashboard/DashHome";
import AdminRoute from "../Shared/PrivateRoute/AdminRoute";
import UserAnalytics from "../Components/UserAnalytics";
import AllUsers from "../Dashboard/AllUsers";
import { getBook } from "../Api/books";

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
        path: "/user-analytics",
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
        path: "/book/:book_name/:id",
        element: <BookDetails />,
        loader: ({ params }) => getBook(params.id),
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
        loader: ({ params }) => getBook(params.id),
      },
      {
        path: "/my-books",
        element: <MyBooks />,
      },
      {
        path: "/my-schedules",
        element: <MySchedules />,
      },
      {
        path: "/admin-dashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <DashLayout />
            </AdminRoute>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/admin-dashboard",
            element: <DashHome />,
          },
          {
            path: "/admin-dashboard/all-books",
            element: (
              <AdminRoute>
                <AdminBooks />
              </AdminRoute>
            ),
          },
          {
            path: "/admin-dashboard/all-bookings",
            element: (
              <AdminRoute>
                <AllBookings />
              </AdminRoute>
            ),
          },
          {
            path: "/admin-dashboard/all-users",
            element: (
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            ),
          },
          {
            path: "/admin-dashboard/books-providers",
            element: (
              <AdminRoute>
                <BooksProviders />
              </AdminRoute>
            ),
          },
          {
            path: "/admin-dashboard/users-to-update",
            element: (
              <AdminRoute>
                <UserToUpdate />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default Root;
