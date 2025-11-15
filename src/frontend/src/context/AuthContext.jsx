// context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Revisando URL para login con Google...");

    const url = new URL(window.location.href);
    const tokenFromUrl = url.searchParams.get("token");

    // SI VIENE DEL LOGIN CON GOOGLE:
    if (tokenFromUrl) {
      console.log("Token recibido desde Google:", tokenFromUrl);

      const safeValue = (v) =>
        v && v !== "null" && v !== "undefined" ? v : "";

      const name = safeValue(url.searchParams.get("name"));
      const email = safeValue(url.searchParams.get("email"));
      const avatar = safeValue(url.searchParams.get("avatar"));

      const safe = (val) =>
        val && val !== "null" && val !== "undefined" ? val : "";

      const userData = {
        name: safe(name),
        email: safe(email),
        avatar: safe(avatar),
      };

      console.log("Datos del usuario recibidos:", userData);

      // Guardar en localStorage
      localStorage.setItem("authToken", tokenFromUrl);
      localStorage.setItem("userData", JSON.stringify(userData));

      // Guardar en estado
      setToken(tokenFromUrl);
      setUser(userData);

      // Limpiar la URL
      window.history.replaceState({}, document.title, "/");

      setLoading(false);
      return;
    }

    // SI NO VIENE DE GOOGLE: cargar desde localStorage
    console.log("Revisando localStorage...");
    console.log("authToken guardado:", localStorage.getItem("authToken"));
    console.log("userData guardado:", localStorage.getItem("userData"));

    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("userData");

    if (savedToken) {
      setToken(savedToken);
    } else {
      setToken(null);
    }

    if (savedUser && savedUser !== "null" && savedUser !== "undefined") {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        console.error("Error leyendo userData, limpiando...");
        localStorage.removeItem("userData");
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  }, []);

  const login = (newToken, userData) => {
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userData", JSON.stringify(userData));

    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
