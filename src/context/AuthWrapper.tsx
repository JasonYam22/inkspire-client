import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { AuthContext, type AuthUser } from "./auth.context";
import service from "../services/index.services";

export function AuthWrapper({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isVerifyingUser, setIsVerifyingUser] = useState(() =>
    Boolean(localStorage.getItem("authToken")),
  );

  const loginUser = useCallback((token: string, user: AuthUser) => {
    localStorage.setItem("authToken", token);
    setUser(user);
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) return;

    service
      .get<{ payload: AuthUser }>("/auth/verify")
      .then(({ data }) => {
        setUser(data.payload);
        setIsVerifyingUser(false);
      })
      .catch(() => setIsVerifyingUser(false));
  }, []);

  if (isVerifyingUser) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-[#F3F1ED]">
        <Loader2 className="h-10 w-10 animate-spin text-[#FF5A36]" />
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#A6ABB2]">
          Verifying credentials...
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(user),
        loggedUserId: user ? user.id : null,
        loggedUserRole: user ? user.role : null,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
