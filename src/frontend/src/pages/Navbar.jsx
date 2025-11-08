import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/icon-celular-24px.svg";
import carritoIcon from "../assets/images/icon-carrito-compras-24px.svg";
import { useCart } from "../context/CartContext";


function Navbar({ token, onLogout }) {
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-400/50 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Contenedor central para logo y navegación */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link
              to="/home"
              id="ALTech"
              className="text-xl font-bold text-blue-600"
            >
              ALTech
            </Link>
            <img src={logo} alt="Logo" className="h-6" />
          </div>

          {/* Menú de navegación en pantallas grandes */}
          <nav className="hidden md:flex space-x-8 text-gray-700 flex-grow justify-center">
            <Link to="/productos-vista" className="hover:text-blue-600">
              Productos
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Comparar
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Marcas
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Ofertas
            </Link>
            <Link to="#" className="hover:text-blue-600">
              Soporte
            </Link>
          </nav>

          {/* Íconos de usuario y carrito */}
          <div className="flex items-center space-x-6">
            <input
              type="text"
              placeholder="Buscar celulares..."
              className="hidden md:block border rounded-lg px-3 py-1 text-sm"
            />
            {token ? (
              <button
                onClick={onLogout}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Cerrar Sesión
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 text-sm hover:bg-green-600 hover:text-white px-2 py-2 rounded transition"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transform hover:scale-105 transition duration-300"
                >
                  Registrarse
                </Link>
              </>
            )}
            <div className="relative">
              <img
                src={carritoIcon}
                alt="Carrito de compras"
                className="h-6 cursor-pointer"
                onClick={() => (window.location.href = "/carrito")} // o abre un modal
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Menú hamburguesa para pantallas pequeñas */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Menú desplegable en móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg px-6 py-4 space-y-4 absolute top-full left-0 right-0 mt-2 transition-all duration-300 ease-in-out transform">
          <Link
            to="/productos-vista"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Productos
          </Link>
          <Link
            to="#"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Comparar
          </Link>
          <Link
            to="#"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Marcas
          </Link>
          <Link
            to="#"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Ofertas
          </Link>
          <Link
            to="#"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Soporte
          </Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
