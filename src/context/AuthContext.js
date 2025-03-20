import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
  }, []);

  const login = async (email, password) => {
    try {
      const users = await axios.get("http://localhost:5000/users");
      const admins = await axios.get("http://localhost:5000/admins");

      const userMatch = users.data.find((u) => u.email === email && u.password === password);
      const adminMatch = admins.data.find((a) => a.email === email && a.password === password);

      if (userMatch) {
        setUser(userMatch);
        localStorage.setItem("user", JSON.stringify(userMatch));
        return "user";
      } else if (adminMatch) {
        setAdmin(adminMatch);
        localStorage.setItem("admin", JSON.stringify(adminMatch));
        return "admin";
      } else {
        return null;
      }
    } catch (err) {
      console.error("Login Error:", err);
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ user, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

