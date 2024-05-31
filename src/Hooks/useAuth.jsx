import { useContext } from "react";
import { AuthContext } from "../Shared/AuthProviders/AuthProviders";
const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
