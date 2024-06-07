import axios from "axios";

const axiosNoToken = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
});

const useAxiosPublic = () => {
  return axiosNoToken;
};

export default useAxiosPublic;
