import { createContext, useContext, useEffect, useState } from "react";
import http from "../api/axios";
import useLocalStorage from "../hooks/useLocalStorage";
import { apiUrl } from "../api/apiUrl";
import { storageKeys } from "../utils/keys/storageKeys";
import useSessionStorage from "../hooks/useSessionStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { paths } from "../utils/core/routes";

// TODO - uploading avatars
interface UserInfo {
  email: string | null;
  avatarSrc: string;
}
interface AuthContextType {
  user: UserInfo | null;
  login?: (email: string, password: string) => void;
  logout?: () => void;
  registerTenant?: (email: string, password: string) => void;
  storedToken?: string;
}

// uploading avatars not implemented yet - temp image src
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

  /**
   * Register user, store api key
   * @param email
   * @param pwd
   *
   */
  const registerTenant = async (email: string, pwd: string) => {
    try {
      const response = await http.apiPost({
        url: `${apiUrl.TENANTS}`,
        data: { name: email, password: pwd },
      });
      if (response?.data) {
        localStorage.setItem(storageKeys.API_KEY, response?.data?.apiKey);
        navigate(`${paths.LOGIN}`);
        window.location.reload();
        toast.success("User created, you can log in.");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, registerTenant }}
      {...props}
    />
  );
};

export { AuthProvider, useAuth };
