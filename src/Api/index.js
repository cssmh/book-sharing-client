import axios from "axios";
import swal from "sweetalert";
import { clearCookie, userLogout } from "./auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("new interceptor", error);
    if (error.response.status === 401 || error.response.status === 403) {
      await clearCookie();
      swal(
        "Your Session has expired",
        "Please log in again to continue",
        "warning"
      );
      await userLogout();
      history.push("/login");
    }

    return Promise.reject(error);
  }
);

export default axiosSecure;
