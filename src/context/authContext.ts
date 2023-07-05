import { createContext } from "react";

export const AuthContext = createContext<{
  authContext: boolean;
  setAuthStatus: (status: boolean) => void;
}>({
  authContext: false,
  setAuthStatus: () => {},
});

export const AuthProvider = AuthContext.Provider;
export default AuthContext;
