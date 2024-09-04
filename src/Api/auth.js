import axiosSecure from ".";
import { getAuth, signOut } from "firebase/auth";
import app from "../Shared/firebase/firebase.config";
const auth = getAuth(app);

export const saveUser = async (user) => {
  const currentUser = {
    name: user?.displayName || "anonymous",
    email: user?.email.toLowerCase(),
    photo: user?.photoURL || import.meta.env.VITE_Default_URL,
    timestamp: [user.metadata?.createdAt, user.reloadUserInfo?.lastLoginAt],
  };
  const { data } = await axiosSecure.put("/add-user", currentUser);
  return data;
};

export const userLogout = async () => {
  return await signOut(auth);
};

// Get token from server
export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  // console.log("login user", data);
  return data;
};

// Clear token from browser
export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};

// update role
export const updateRole = async (email, role) => {
  const { data } = await axiosSecure.patch(`/user-update/${email}`, { role });
  return data;
};
