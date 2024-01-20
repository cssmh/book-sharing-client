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
            loader: ()=> fetch('http://localhost:5000/services')
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
           path:'/services',
           element:<Services></Services>,
           loader: ()=> fetch('http://localhost:5000/services')
          },
          {
            path:'/service/:id',
            element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>,
              loader: ({params})=> fetch(`http://localhost:5000/services/${params.id}`)
          },
          {
            path:'/add-service',
            element:<PrivateRoute><AddService></AddService></PrivateRoute>
          },
          {
            path:'/manage-service',
            element:<PrivateRoute><ManageServices></ManageServices></PrivateRoute>
          },
          {
            path:'/updateservice/:id',
            element:<PrivateRoute><UpdateService></UpdateService></PrivateRoute>,
            loader:({params}) => fetch(`http://localhost:5000/services/${params.id}`)

          },
          {
            path:'/my-schedules',
            element:<PrivateRoute><MySchedules></MySchedules></PrivateRoute>
          }
      ]
    },
  ]);

  export default router;