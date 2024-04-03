import axios from "axios";
import { useEffect } from "react";
import useContextHook from "./useContextHook";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const axiosSecure = axios.create({
  baseURL: "https://book-sharing-server.vercel.app",
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
              // token expire or any 401 || 403 happened
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
