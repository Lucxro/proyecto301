import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/icon-celular-24px.svg";
import carritoIcon from "../assets/images/icon-carrito-compras-24px.svg";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleCarritoClick = () => {
    navigate(token ? "/carrito" : "/login");
  };

  return (
    <header className="bg-gray-200 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-1">
            ALTech <img src={logo} alt="Logo" className="h-6" />
          </Link>
        </div>

        {/* Botón menú móvil */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Menú principal escritorio */}
        <nav className="hidden md:flex space-x-8 text-gray-700 flex-grow justify-center">
          <Link to="/productos-vista" className="hover:text-blue-600">Productos</Link>
          <Link to="#" className="hover:text-blue-600">Comparar</Link>
          <Link to="#" className="hover:text-blue-600">Marcas</Link>
          <Link to="#" className="hover:text-blue-600">Ofertas</Link>
          <Link to="#" className="hover:text-blue-600">Soporte</Link>
        </nav>

        {/* Zona de acciones */}
        <div className="hidden md:flex items-center space-x-4">
          <input
            type="text"
            placeholder="Buscar celulares..."
            className="border rounded-lg px-3 py-1 text-sm"
          />

          {token ? (
            <button
              onClick={logout}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-700 text-sm hover:bg-green-600 hover:text-white px-3 py-1 rounded transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition"
              >
                Registrarse
              </Link>
            </>
          )}

          <div
            className="relative cursor-pointer"
            onClick={handleCarritoClick}
          >
            <img src={carritoIcon} alt="Carrito" className="h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-t px-6 py-4 flex flex-col space-y-3">
          <Link to="/productos-vista" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Productos</Link>
          <Link to="#" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Comparar</Link>
          <Link to="#" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Marcas</Link>
          <Link to="#" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Ofertas</Link>
          <Link to="#" className="hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>Soporte</Link>

          <input
            type="text"
            placeholder="Buscar celulares..."
            className="border rounded-lg px-3 py-1 text-sm mt-2"
          />

          {token ? (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-blue-600"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;

