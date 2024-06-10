import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigateTo = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("error in interceptor", error.response);
        if (
          error.response &&
          (error.response?.status === 401 || error.response?.status === 403)
        ) {
          Swal.fire(
            "Your Session has expired",
            "Please log in again to continue",
            "warning"
          ).then(() => {
            logOut()
              .then(() => {
                navigateTo("/login");
              })
              .catch();
          });
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigateTo]);

  return axiosSecure;
};

export default useAxiosSecure;
