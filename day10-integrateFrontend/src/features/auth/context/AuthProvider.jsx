import { createContext, useState } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Auth.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Auth.Provider>
  );
};
