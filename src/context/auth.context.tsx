import { createContext, useEffect, useState, type ReactNode } from "react";
import service from "../services/index.services";
import { Loader2 } from "lucide-react";

// Inside auth.context.tsx
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthWrapper");
  }
  return context
};

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  loggedUserId: string | null;
  setLoggedUserId: (id: string | null) => void;
  verifyUser: () => Promise<void>;
  loggedUserRole: string | null;
  setLoggedUserRole: (role: string | null) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function AuthWrapper({ children }: {children: ReactNode}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState<string | null>(null)
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);
 const [loggedUserRole, setLoggedUserRole] = useState<string | null>(null); 

  const verifyUser = async () => {
    try {
      const response = await service.get("/auth/verify");

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload.id);
      setLoggedUserRole(response.data.payload.role);
      setIsVerifyingUser(false);
    } catch (error) {
  
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsVerifyingUser(false);
      setLoggedUserRole(null);
    }
  };

const logoutUser = () => {
  localStorage.removeItem("authToken");
  setIsLoggedIn(false);
  setLoggedUserId(null);
  setLoggedUserRole(null);
};

  useEffect(() => {
    verifyUser(); 
  }, []);

  const passedContext: AuthContextType = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId,
    verifyUser,
    loggedUserRole,
    setLoggedUserRole,
    logoutUser
  };

    if (isVerifyingUser) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4  text-[#F3F1ED]">
          <Loader2 className="h-10 w-10 animate-spin text-[#FF5A36]" />
          <p
            className="text-sm font-bold uppercase tracking-[0.18em] text-[#A6ABB2]"
            style={{ fontFamily: "'Archivo Black', sans-serif" }}
          >
            Verifying credentials...
          </p>
        </div>
      );
    }
  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
