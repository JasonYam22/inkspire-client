import { createContext, useContext } from "react";

export const GOOGLE_SIGN_IN_KEY = "inkspire_google_sign_in";

export type AuthUser = {
  id: string;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  loggedUserId: string | null;
  loggedUserRole: string | null;
  loginUser: (token: string, user: AuthUser) => void;
  logoutUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context;
};
