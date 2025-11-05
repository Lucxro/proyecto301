import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";

function Login() {
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;
  const FACEBOOK_AUTH_URL = "#"; // URL de autenticación de Facebook
  const APPLE_AUTH_URL = "#"; // URL de autenticación de Apple

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
        <p className="mb-6 text-gray-600">
          Ingresa con tu correo o con una cuenta social
        </p>

        {/* Formulario de login */}
        <form className="flex flex-col gap-4 mb-6">
          <label htmlFor="email" className="text-left text-gray-500 ">
            Correo electrónico
          </label>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="password" className="text-left text-gray-500">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Separador */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Opciones de login social */}
        <div className="flex flex-col gap-4">
          <a
            href={GOOGLE_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <FcGoogle size={24} />
            <span className="text-gray-700 font-medium">
              Iniciar sesión con Google
            </span>
          </a>

          <a
            href={FACEBOOK_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <FaFacebookF size={20} className="text-blue-600" />
            <span className="text-gray-700 font-medium">
              Iniciar sesión con Facebook
            </span>
          </a>

          <a
            href={APPLE_AUTH_URL}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-100 transition-colors"
          >
            <FaApple size={20} />
            <span className="text-gray-700 font-medium">
              Iniciar sesión con Apple
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
