import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
  const FACEBOOK_AUTH_URL = "#";
  const APPLE_AUTH_URL = "#";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Suponiendo que el backend devuelve { token: "..." }
      login(data.token);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  // Si está logueado, redirige
  if (token) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <p className="mb-6 text-gray-600">
          Ingresa con tu correo o con una cuenta social
        </p>

        <form className="flex flex-col gap-4 mb-6" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-left text-gray-500">Correo electrónico</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label htmlFor="password" className="text-left text-gray-500">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex justify-between items-center text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Recuérdame
            </label>
            <a href="#" className="text-blue-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors mt-2"
          >
            Iniciar sesión
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex flex-col gap-4">
          <a
            href={GOOGLE_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">Iniciar sesión con Google</span>
          </a>

          <a
            href={FACEBOOK_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <FaFacebookF size={20} className="text-blue‑600" />
            <span className="text-gray‑700 font-medium">Iniciar sesión con Facebook</span>
          </a>

          <a
            href={APPLE_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray‑300 rounded-lg py-2 px-4 hover:bg-gray‑100 transition-colors"
          >
            <FaApple size={20} />
            <span className="text-gray‑700 font‑medium">Iniciar sesión con Apple</span>
          </a>
        </div>

        <p className="text-gray-600 text-sm mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue‑500 hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

