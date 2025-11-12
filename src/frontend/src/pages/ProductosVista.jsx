import { useEffect, useState } from "react";
import ProductCardModern from "../components/ProductCardModern";

export default function ProductosVista() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [precioMax, setPrecioMax] = useState(1500);
  const [marcasSeleccionadas, setMarcasSeleccionadas] = useState([]);
  const [sistemasSeleccionados, setSistemasSeleccionados] = useState([]);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

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
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  const toggleMarca = (marca) => {
    setMarcasSeleccionadas((prev) =>
      prev.includes(marca) ? prev.filter((m) => m !== marca) : [...prev, marca]
    );
  };

  const toggleSistema = (sistema) => {
    setSistemasSeleccionados((prev) =>
      prev.includes(sistema)
        ? prev.filter((s) => s !== sistema)
        : [...prev, sistema]
    );
  };

  const limpiarFiltros = () => {
    setBusqueda("");
    setPrecioMax(1500);
    setMarcasSeleccionadas([]);
    setSistemasSeleccionados([]);
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda = p.name
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    const coincidePrecio = p.price <= precioMax;
    const coincideMarca =
      marcasSeleccionadas.length === 0 || marcasSeleccionadas.includes(p.brand);
    const coincideSistema =
      sistemasSeleccionados.length === 0 ||
      sistemasSeleccionados.includes(p.os);
    return (
      coincideBusqueda && coincidePrecio && coincideMarca && coincideSistema
    );
  });

  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500">
        Cargando productos...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 🔹 Overlay para móvil */}
          {mostrarFiltros && (
            <div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMostrarFiltros(false)}
            ></div>
          )}

          {/* 🔹 Sidebar de filtros */}
          <aside
            className={`${
              mostrarFiltros
                ? "fixed inset-y-0 left-0 z-50 w-4/5 sm:w-1/2 bg-white p-6 overflow-y-auto rounded-r-2xl shadow-2xl transition-transform transform translate-x-0"
                : "fixed inset-y-0 left-0 z-50 w-4/5 sm:w-1/2 bg-white p-6 overflow-y-auto rounded-r-2xl shadow-2xl transition-transform transform -translate-x-full"
            } 
            lg:static lg:w-1/4 lg:bg-white lg:p-6 lg:rounded-2xl lg:shadow-md lg:overflow-visible lg:transform-none lg:z-auto lg:h-fit lg:sticky lg:top-28`}
          >
            {/* 🔹 Encabezado */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={limpiarFiltros}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setMostrarFiltros(false)}
                  className="lg:hidden text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 🔹 Buscar */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 🔹 Rango de precio */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Precio: $0 - ${precioMax}
              </label>
              <input
                type="range"
                min="0"
                max="1500"
                value={precioMax}
                onChange={(e) => setPrecioMax(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            {/* 🔹 Marcas */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-2">Marcas</h3>
              {[
                "iPhone",
                "Samsung",
                "Google",
                "Xiaomi",
                "OnePlus",
                "Huawei",
              ].map((marca) => (
                <label key={marca} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={marcasSeleccionadas.includes(marca)}
                    onChange={() => toggleMarca(marca)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700 text-sm">{marca}</span>
                </label>
              ))}
            </div>

            {/* 🔹 Sistemas operativos */}
            <div>
              <h3 className="font-medium text-gray-800 mb-2">
                Sistema Operativo
              </h3>
              {[
                "iOS 17",
                "Android 14",
                "MIUI 15",
                "OxygenOS 14",
                "HarmonyOS 3.1",
                "HyperOS",
              ].map((sistema) => (
                <label
                  key={sistema}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={sistemasSeleccionados.includes(sistema)}
                    onChange={() => toggleSistema(sistema)}
                    className="accent-blue-600"
                  />
                  <span className="text-gray-700 text-sm">{sistema}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* 🔹 Contenedor principal */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 text-sm">
                {productosFiltrados.length} productos encontrados
              </p>
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="lg:hidden px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
              >
                {mostrarFiltros ? "Cerrar filtros" : "Mostrar filtros"}
              </button>
            </div>

            {productosFiltrados.length === 0 ? (
              <p className="text-center text-gray-500">
                No hay productos disponibles con los filtros seleccionados.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productosFiltrados.map((producto) => (
                  <ProductCardModern key={producto.id} product={producto} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

