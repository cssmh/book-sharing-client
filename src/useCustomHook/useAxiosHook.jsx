import axios from "axios";
import toast from "react-hot-toast";
import useContextHook from "./useContextHook";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const axiosNoToken = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosHook = () => {
  const { logOut } = useContextHook();
  const navigateTo = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        // console.log("error in interceptor", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          logOut()
            .then(() => {
              // token expire or any 401 || 403 happened
              toast.error("Authorization error, login again!");
              navigateTo("/login");
            })
            .catch();
        }
      }
    );
  }, [logOut, navigateTo]);

  return { axiosSecure, axiosNoToken };
};

export default useAxiosHook;
