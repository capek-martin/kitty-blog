import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { apiUrl } from "../api/apiUrl";
import { storageKeys } from "../utils/keys/storageKeys";
import useSessionStorage from "../hooks/useSessionStorage";
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
export const tmpAvatar = "/images/avatar-female.jpg";
const AuthContext = createContext<AuthContextType>({
  user: { avatarSrc: tmpAvatar, email: null },
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
    if (storedUser) {
      setUser({ ...storedUser, email: storedUser.email });
    } else {
      setUser(null);
    }
  }, []);

  /**
   * Logs in user
   * @param email
   * @param pwd
   *
   * login("capekma1@gmail.com", "Heslo");
   */
  const login = async (email: string, pwd: string) => {
    console.log(storedToken, "storedToken");
    try {
      const response = await http.apiPost({
        url: `${apiUrl.LOGIN}`,
        data: { username: email, password: pwd },
      });
      if (response?.data && response?.data?.access_token) {
        setStoredToken(response?.data?.access_token);
        setStoredUser({ email: email, avatarSrc: tmpAvatar });
        setUser({ email: email, avatarSrc: tmpAvatar });
        navigate(`${paths.MY_ARTICLES}`);
      } else if (!response) {
        toast.error("Invalid credentials");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  /**
   * Logs user out
   */
  const logout = () => {
    setStoredToken(null);
    setStoredUser(null);
    setUser(null);
    navigate(`${paths.HOME}`);
  };

  return <AuthContext.Provider value={{ user, login, logout }} {...props} />;
};

export { AuthProvider, useAuth };
