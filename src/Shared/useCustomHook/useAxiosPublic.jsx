import axios from "axios";

const axiosNoToken = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosPublic = () => {
  return axiosNoToken;
};

export default useAxiosPublic;
