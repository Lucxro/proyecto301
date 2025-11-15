import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/icon-celular-24px.svg";
import carritoIcon from "../assets/images/icon-carrito-compras-24px.svg";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { token, logout, user } = useContext(AuthContext);
  const { cart, cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [productos, setProductos] = useState([]);
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

  // Obtener productos desde la API
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();

        if (Array.isArray(data)) {
          setProductos(data);
        } else if (Array.isArray(data.products)) {
          setProductos(data.products);
        } else {
          setProductos([]);
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setProductos([]);
      }
    };

    obtenerProductos();
  }, []);

  // Filtrar productos al escribir
  useEffect(() => {
    if (busqueda.trim() === "") {
      setResultados([]);
      return;
    }

    const filtrados = productos.filter((p) =>
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase())
    );

    setResultados(filtrados.slice(0, 5));
  }, [busqueda, productos]);

  // Animación carrito
  useEffect(() => {
    if (cart.length > 0) {
      setCartAnimation(true);
      const timeout = setTimeout(() => setCartAnimation(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [cart.length]);

  const handleCarritoClick = () => {
    navigate(token ? "/carrito" : "/login");
  };

  // Inicial del usuario
  const userInitial =
    user?.name?.charAt(0)?.toUpperCase() ||
    user?.email?.charAt(0)?.toUpperCase() ||
    "U";

  return (
    <header className="bg-gray-200 shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-xl font-bold text-blue-600 flex items-center gap-1"
          >
            ALTech <img src={logo} alt="Logo" className="h-6" />
          </Link>
        </div>

        {/* 🔹 Iconos móviles */}
        <div className="flex items-center space-x-4 md:hidden">

          {/* Carrito */}
          <div className="relative cursor-pointer" onClick={handleCarritoClick}>
            <img
              src={carritoIcon}
              alt="Carrito"
              className={`h-6 transition-transform ${
                cartAnimation ? "scale-110" : ""
              }`}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Usuario móvil */}
          {token && (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center justify-center hover:bg-gray-300 transition overflow-hidden"
              >
                <div className="relative w-8 h-8">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentNode.querySelector("#fallbackMobile");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}

                  <div
                    id="fallbackMobile"
                    className={`${
                      user?.avatar ? "hidden" : "flex"
                    } w-8 h-8 bg-gray-900 text-white rounded-full items-center justify-center font-bold`}
                  >
                    {userInitial}
                  </div>
                </div>
              </button>

              {/* Menú usuario móvil */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/perfil");
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    Perfil
                  </button>
                  <button
                    onClick={() => {
                      navigate("/mis-pedidos");
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    Mis pedidos
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Menú hamburguesa */}
          <button
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* 🔹 Menú desktop */}
        <nav className="hidden md:flex space-x-8 text-gray-700 flex-grow justify-center">
          <Link to="/productos-vista" className="hover:text-blue-600">Productos</Link>
          <Link to="/comparar" className="hover:text-blue-600">Comparar</Link>
          <Link to="/marcas" className="hover:text-blue-600">Marcas</Link>
          <Link to="/ofertas" className="hover:text-blue-600">Ofertas</Link>
          <Link to="/soporte" className="hover:text-blue-600">Soporte</Link>
        </nav>

        {/* 🔹 Área derecha desktop */}
        <div className="hidden md:flex items-center space-x-4 relative">

          {/* Input búsqueda */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar celulares..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="border rounded-lg px-3 py-1 text-sm w-56 focus:ring-2 focus:ring-blue-500"
            />

            {/* Resultados */}
            {resultados.length > 0 && (
              <div className="absolute top-10 left-0 bg-white border rounded-lg shadow-lg w-full max-h-60 overflow-y-auto z-50">
                {resultados.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate(`/producto/${p.id}`);
                      setBusqueda("");
                      setResultados([]);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-50 text-sm"
                  >
                    {p.nombre}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 🔹 Usuario desktop */}
          {token ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-9 h-9 rounded-full bg-gray-100 text-gray-700 font-semibold flex items-center justify-center hover:bg-gray-300 transition overflow-hidden"
              >
                <div className="relative w-9 h-9">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      className="w-9 h-9 object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = "none";
                        const fallback =
                          e.target.parentNode.querySelector("#fallbackDesktop");
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                  ) : null}

                  <div
                    id="fallbackDesktop"
                    className={`${
                      user?.avatar ? "hidden" : "flex"
                    } w-9 h-9 bg-gray-900 text-white rounded-full items-center justify-center font-bold`}
                  >
                    {userInitial}
                  </div>
                </div>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/perfil");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    Perfil
                  </button>

                  <button
                    onClick={() => {
                      navigate("/mis-pedidos");
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                  >
                    Mis pedidos
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:bg-green-600 hover:text-white px-3 py-1 rounded">
                Iniciar sesión
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">
                Registrarse
              </Link>
            </>
          )}

          {/* Carrito */}
          <div className="relative cursor-pointer" onClick={handleCarritoClick}>
            <img
              src={carritoIcon}
              alt="Carrito"
              className={`h-6 transition-transform ${
                cartAnimation ? "scale-110" : ""
              }`}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Overlay móvil */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Menú móvil */}
      <div
        className={`md:hidden bg-white border-t shadow-md absolute w-full left-0 transition-all duration-300 z-50 ${
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col items-start px-6 py-4 space-y-3 text-gray-700">
          
          {[
            { name: "Productos", path: "/productos-vista" },
            { name: "Comparar", path: "/comparar" },
            { name: "Marcas", path: "/marcas" },
            { name: "Ofertas", path: "/ofertas" },
            { name: "Soporte", path: "/soporte" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600"
            >
              {item.name}
            </Link>
          ))}

          {/* Usuario móvil */}
          {token ? (
            <div className="mt-3 border-t w-full pt-3">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-semibold truncate">{user?.name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>

              <button
                onClick={() => {
                  navigate("/perfil");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full py-2 px-3 text-left rounded-md hover:bg-blue-50"
              >
                Perfil
              </button>

              <button
                onClick={() => {
                  navigate("/mis-pedidos");
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full py-2 px-3 text-left rounded-md hover:bg-blue-50"
              >
                Mis pedidos
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full py-2 px-3 text-left text-red-600 rounded-md hover:bg-red-50"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="mt-4 border-t w-full pt-3 space-y-2">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2 px-3 text-center rounded-md bg-green-600 text-white hover:bg-green-500"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2 px-3 text-center rounded-md bg-blue-600 text-white hover:bg-blue-500"
              >
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
