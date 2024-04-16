import axios from "axios";

const useAxiosNoToken = () => {
  const axiosNoToken = axios.create({
    baseURL: "https://book-sharing-server.vercel.app",
  });
  return axiosNoToken;
};

export default useAxiosNoToken;
