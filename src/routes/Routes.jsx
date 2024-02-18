import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ErrorPage from "../pages/Errorpage/Errorpage";
import Services from "../pages/Services/Services";
import PrivateRoute from "./PrivateRoute";
import ServiceDetails from "../pages/ServiceDetails/ServiceDetails";
import AddService from "../pages/AddService/AddService";
import ManageServices from "../pages/ManageServices/ManageServices";
import UpdateService from "../pages/ManageServices/UpdateService";
import MySchedules from "../pages/MySchedules/MySchedules";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>,
            loader: ()=> fetch('https://book-sharing-server.vercel.app/services')
        },
        {
            path:'/login',
            element:<Login></Login>
          },
          {
            path:'/register',
            element:<Register></Register>
          },
          {
           path:'/all-books',
           element:<Services></Services>,
           loader: ()=> fetch('https://book-sharing-server.vercel.app/services')
          },
          {
            path:'/service/:id',
            element:<PrivateRoute><ServiceDetails /></PrivateRoute>,
              loader: ({params})=> fetch(`https://book-sharing-server.vercel.app/services/${params.id}`)
          },
          {
            path:'/add-book',
            element:<PrivateRoute><AddService /></PrivateRoute>
          },
          {
            path:'/my-books',
            element:<PrivateRoute><ManageServices /></PrivateRoute>
          },
          {
            path:'/updateservice/:id',
            element:<PrivateRoute><UpdateService /></PrivateRoute>,
            loader:({params}) => fetch(`https://book-sharing-server.vercel.app/services/${params.id}`)

          },
          {
            path:'/my-schedules',
            element:<PrivateRoute><MySchedules /></PrivateRoute>
          }
      ]
    },
  ]);

  export default router;