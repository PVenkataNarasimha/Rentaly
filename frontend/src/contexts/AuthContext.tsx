import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT
  const navigate = useNavigate();

  // ✅ VERIFY LOGIN ON PAGE REFRESH
  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/auth/verify", {
          credentials: "include",
        });

        setIsAuthenticated(res.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // 🔥 AUTH CHECK COMPLETE
      }
    };

    verifyAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      navigate("/");
      return true;
    }

    return false;
  };

  const logout = async () => {
    await fetch("http://localhost:3001/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
