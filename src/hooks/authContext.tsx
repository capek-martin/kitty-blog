import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/axios";
import useLocalStorage from "./useLocalStorage";
import { apiUrl } from "../api/apiUrl";
import { storageKeys } from "../utils/keys/storageKeys";
import useSessionStorage from "./useSessionStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paths } from "../utils/core/routes";

// TODO - user registration + uploading avatars
interface UserInfo {
  email: string | null;
  avatarSrc: string;
}
interface AuthContextType {
  user: UserInfo | null;
  login?: (email: string, password: string) => void;
  logout?: () => void;
  storedToken?: string;
}
const baseAvatar = "/images/avatar-female.jpg";
const AuthContext = createContext<AuthContextType>({
  user: { avatarSrc: baseAvatar, email: null },
});
const useAuth = () => useContext<AuthContextType>(AuthContext);

/**
 * Authorization component
 */
const AuthProvider = (props: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>();
  const [storedUser, setStoredUser] = useSessionStorage<UserInfo | null>(
    storageKeys.USER,
    null
  );
  const [storedToken, setStoredToken] = useLocalStorage<string | null>(
    storageKeys.BEARER_TOKEN_KEY,
    null
  );

  useEffect(() => {
    if (storedUser) setUser({ ...storedUser, email: storedUser.email });
  }, []);

  /**
   * Logs in user
   * @param email
   * @param pwd
   *
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
        setStoredUser({ email: email, avatarSrc: baseAvatar });
        setUser({ email: email, avatarSrc: baseAvatar });
        navigate(`${paths.MY_ARTICLES}`);
      } else {
        toast.error("Invalid credentials");
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
