import axios from "axios";
import { useEffect } from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
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
        if (error.response.status === 401 || error.response.status === 403) {
          swal(
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
      }
    );
  }, [logOut, navigateTo]);

  return axiosSecure;
};

export default useAxiosSecure;