import { Link } from "react-router-dom";
import logo from "../assets/images/icon-celular-24px.svg";
import carritoIcon from "../assets/images/icon-carrito-compras-24px.svg";

function Navbar({ token, onLogout }) {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-colorPrin">ALTech</span>
          <img src={logo} alt="Logo" className="h-6" />
        </div>

        <nav className="hidden md:flex space-x-6 text-gray-700">
          <Link to="#" className="hover:text-blue-600">Productos</Link>
          <Link to="#" className="hover:text-blue-600">Comparar</Link>
          <Link to="#" className="hover:text-blue-600">Marcas</Link>
          <Link to="#" className="hover:text-blue-600">Ofertas</Link>
          <Link to="#" className="hover:text-blue-600">Soporte</Link>
        </nav>

        <div className="flex items-center space-x-4">
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
              <Link to="/login" className="text-gray-700 hover:text-blue-600">
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Registrarse
              </Link>
            </>
          )}
          <img src={carritoIcon} alt="Carrito" className="h-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}

export default Navbar;

