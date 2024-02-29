import { useContext } from "react";
import { AuthContext } from "../AuthProviders/AuthProviders";
const useContextHook = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useContextHook;
