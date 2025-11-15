import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [freeShipping, setFreeShipping] = useState(false);
  const [message, setMessage] = useState("");

  // Calcular subtotal y total dinámico
  const calcularSubtotal = () =>
    cart.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );

  const envioBase = freeShipping || calcularSubtotal() > 500 ? 0 : 20;
  const subtotal = calcularSubtotal();
  const total = (subtotal - subtotal * discount).toFixed(2);

const aplicarCodigo = () => {
  const codigo = promoCode.trim().toLowerCase();

  if (codigo === "descuento10") {
    setDiscount(0.1);
    setFreeShipping(false);
    setMessage("✅ Se aplicó un 10% de descuento.");

    // 👉 Guardar en localStorage
    localStorage.setItem("promo", JSON.stringify({
      code: codigo,
      discount: 0.1,
      freeShipping: false
    }));

  } else if (codigo === "enviogratis") {
    setDiscount(0);
    setFreeShipping(true);
    setMessage("🚚 Envío gratis aplicado.");

    localStorage.setItem("promo", JSON.stringify({
      code: codigo,
      discount: 0,
      freeShipping: true
    }));

  } else {
    setDiscount(0);
    setFreeShipping(false);
    setMessage("❌ Código inválido.");

    localStorage.removeItem("promo");
  }
};


  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-700">
        <p className="text-lg font-medium mb-4">Tu carrito está vacío 🛒</p>
        <button
          onClick={() => navigate("/productos-vista")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Carrito de Compras
          </h1>

          <p className="text-gray-500 mb-4">
            {cart.length} producto{cart.length > 1 ? "s" : ""} en tu carrito
          </p>

          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between border-b pb-5"
              >
                {/* Imagen y detalles */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={
                      item.imageUrl
                        ? item.imageUrl.startsWith("http")
                          ? item.imageUrl
                          : `http://localhost:3000/${item.imageUrl.replace(
                              /^\//,
                              ""
                            )}`
                        : "/placeholder.jpg"
                    }
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg bg-gray-50"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      {item.ram} • {item.almacenamiento} • {item.sistema}
                    </p>
                    <p className="text-sm text-gray-500">
                      Precio: ${item.price?.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Controles de cantidad y eliminar */}
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max((item.quantity || 1) - 1, 1)
                        )
                      }
                      className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-200 transition"
                    >
                      -
                    </button>
                    <span className="px-3 text-gray-800 font-medium">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                      disabled={item.quantity >= item.stock}
                      className={`px-3 py-1 text-lg transition ${
                        item.quantity >= item.stock
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-200"
                      }`}
                      title={
                        item.quantity >= item.stock
                          ? `Stock máximo (${item.stock}) alcanzado`
                          : "Aumentar cantidad"
                      }
                    >
                      +
                    </button>
                  </div>

                  <p className="font-semibold text-gray-800 w-20 text-right">
                    ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Botón para seguir comprando */}
          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
            >
              <ArrowLeft size={18} /> Seguir comprando
            </button>

            <button
              onClick={clearCart}
              className="text-sm border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-fit sticky top-28">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            Resumen del Pedido
          </h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>
                {envioBase === 0 ? "Gratis" : `$${envioBase.toFixed(2)}`}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Descuento</span>
                <span>-{(discount * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-semibold text-gray-800">
            <span>Total</span>
            <span>${(parseFloat(total) + envioBase).toFixed(2)}</span>
          </div>
          {/* Código promocional */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Código Promocional
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Ingresa tu código"
                className="flex-grow border rounded-lg px-3 py-2 text-sm"
              />
              <button
                onClick={aplicarCodigo}
                className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Aplicar
              </button>
            </div>
            {message && (
              <p className="text-sm mt-2 text-gray-600 italic">{message}</p>
            )}
          </div>
          {/* Proceder al pago */}
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-600 text-white mt-2 px-4 py-2 rounded-lg"
          >
            💳 Proceder al pago
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Envío gratis en compras mayores a $500
          </p>
        </div>
      </div>
    </div>
  );
}
