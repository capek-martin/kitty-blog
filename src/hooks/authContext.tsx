import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/axios";
import useLocalStorage from "./useLocalStorage";
import { apiUrl } from "../api/apiUrl";
import { storageKeys } from "../utils/keys/storageKeys";
import useSessionStorage from "./useSessionStorage";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: any | null;
  login?: (email: string, password: string) => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
});
const useAuth = () => useContext<AuthContextType>(AuthContext);

/**
 * Authorization component
 */
const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>();
  const [storedUser, setStoredUser] = useSessionStorage<string | null>(
    storageKeys.USER_EMAIL,
    null
  );
  const [storedToken, setStoredToken] = useLocalStorage<string | null>(
    storageKeys.BEARER_TOKEN_KEY,
    null
  );

  useEffect(() => {
    if (storedUser) setUser(storedUser);
  }, []);

  /**
   * Logs in user
   * @param email
   * @param pwd
   * login("capekma1@gmail.com", "Heslo");
   */
  const login = async (email: string, pwd: string) => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.LOGIN}`,
        data: { username: email, password: pwd },
      });
      if (response?.data && response?.data?.access_token) {
        setStoredToken(response?.data?.access_token);
        setStoredUser(email);
        setUser(email);
        navigate("/");
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  /**
   * Logs user out
   */
  const logout = () => {
    console.log("TODO");
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

export { AuthProvider, useAuth };
