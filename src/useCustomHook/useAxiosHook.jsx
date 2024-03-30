import axios from "axios";
import { useEffect } from "react";
import useContextHook from "./useContextHook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
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
              toast.error("Authorization error, login again!");
              navigateTo("/login");
            })
            .catch();
        }
      }
    );
  }, [logOut, navigateTo]);
  return axiosSecure;
};

export default useAxiosHook;
