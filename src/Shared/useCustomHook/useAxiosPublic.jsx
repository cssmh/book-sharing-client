import axios from "axios";

const axiosNoToken = axios.create({
  baseURL: "https://book-sharing-server.vercel.app",
});

const useAxiosPublic = () => {
  return axiosNoToken;
};

export default useAxiosPublic;
