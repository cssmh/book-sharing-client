import axiosSecure from ".";
import { getAuth, signOut } from "firebase/auth";
import app from "../Shared/firebase/firebase.config";
const auth = getAuth(app);

export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName,
    email: user?.email.toLowerCase(),
    role: "guest",
  };
  const { data } = await axiosSecure.put("/add-user", currentUser);

  return data;
};

export const userLogout = async () => {
  return await signOut(auth);
};

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  // console.log("login user", data);
  return data;
};
