import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Banknote,
  Wallet,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [pago, setPago] = useState("tarjeta");
  const [orderId, setOrderId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    ciudad: "",
    direccion: "",
  });

  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    vencimiento: "",
    cvv: "",
  });

  // Recuperar descuento y envío gratis guardados desde el carrito
  const promo = JSON.parse(localStorage.getItem("promo") || "{}");
  const discount = promo.discount || 0;
  const freeShipping = promo.freeShipping || false;

  // Calcular costo de envío y total con descuento aplicado
  const costoEnvio = freeShipping || subtotal > 500 ? 0 : 20;
  const total = (subtotal - subtotal * discount) + costoEnvio;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setTarjeta((prev) => ({ ...prev, [name]: value }));
  };

  const validarTarjeta = () => {
    if (pago !== "tarjeta") return true;
    const { numero, nombre, vencimiento, cvv } = tarjeta;
    if (!numero || numero.length < 16) return false;
    if (!nombre.trim()) return false;
    if (!vencimiento.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return false;
    if (!cvv || cvv.length < 3) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pago === "tarjeta" && !validarTarjeta()) {
      setMensaje("❌ Por favor completa correctamente todos los datos de la tarjeta.");
      return;
    }

    setLoading(true);
    setMensaje("");

    try {
      const response = await fetch("http://localhost:3000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          metodoPago: pago,
          total,
          descuentoAplicado: discount,
          envioGratis: freeShipping,
          productos: cart.map((p) => ({
            nombre: p.name,
            cantidad: p.quantity,
            precio: p.price,
          })),
          datosTarjeta: pago === "tarjeta" ? tarjeta : null,
        }),
      });

      if (!response.ok) throw new Error("Error al crear la orden");

      const data = await response.json();
      setOrderId(data.id || Math.floor(Math.random() * 1000000));
      setMensaje("✅ Orden registrada con éxito. ¡Gracias por tu compra!");

      // Limpiar carrito y promoción al finalizar la compra
      clearCart();
      localStorage.removeItem("promo");

      setStep(3);
    } catch (error) {
      console.error(error);
      setMensaje("❌ Ocurrió un error al procesar la orden.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
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

  const variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 pb-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md relative overflow-hidden">
        {/* Indicador de pasos */}
        <div className="flex justify-between mb-8 text-sm font-medium text-gray-600">
          <div
            className={`flex-1 text-center ${
              step >= 1 ? "text-blue-600 font-semibold" : ""
            }`}
          >
            1️⃣ Envío
          </div>
          <div
            className={`flex-1 text-center ${
              step >= 2 ? "text-blue-600 font-semibold" : ""
            }`}
          >
            2️⃣ Pago
          </div>
          <div
            className={`flex-1 text-center ${
              step === 3 ? "text-blue-600 font-semibold" : ""
            }`}
          >
            3️⃣ Confirmación
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* PASO 1: Envío */}
          {step === 1 && (
            <motion.div
              key="envio"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                🧾 Detalles de Envío
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="space-y-4"
              >
                {["nombre", "apellido", "celular", "correo", "ciudad", "direccion"].map((campo) => (
                  <div key={campo}>
                    <label className="block text-sm font-medium text-gray-600 capitalize">
                      {campo}
                    </label>
                    <input
                      type="text"
                      name={campo}
                      value={form[campo]}
                      onChange={handleChange}
                      required
                      className="w-full border rounded-lg px-3 py-2 mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                ))}
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="text-gray-600 flex items-center gap-1 hover:text-blue-600"
                  >
                    <ArrowLeft size={18} /> Volver
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Continuar con el Pago 💳
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* PASO 2: Pago */}
          {step === 2 && (
            <motion.div
              key="pago"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                💳 Método de Pago
              </h2>

              <p className="text-gray-700 mb-4 text-base">
                <span className="font-semibold text-blue-600">Total a pagar:</span>{" "}
                S/ {total.toFixed(2)}{" "}
                {costoEnvio > 0
                  ? "(Incluye envío S/ 20.00)"
                  : "(Envío gratis 🚚)"}
              </p>

              {discount > 0 && (
                <p className="text-green-600 mb-4 text-sm">
                  💰 Descuento aplicado: -{(discount * 100).toFixed(0)}%
                </p>
              )}

              <div className="space-y-4">
                {[
                  {
                    id: "tarjeta",
                    icon: <CreditCard size={20} />,
                    label: "Tarjeta de crédito / débito",
                  },
                  { id: "yape", icon: <Smartphone size={20} />, label: "Yape" },
                  { id: "plin", icon: <Wallet size={20} />, label: "Plin" },
                  {
                    id: "transferencia",
                    icon: <Banknote size={20} />,
                    label: "Transferencia Bancaria",
                  },
                ].map((metodo) => (
                  <label
                    key={metodo.id}
                    className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer ${
                      pago === metodo.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="metodoPago"
                      value={metodo.id}
                      checked={pago === metodo.id}
                      onChange={(e) => setPago(e.target.value)}
                    />
                    <span className="text-blue-600">{metodo.icon}</span>
                    <span className="capitalize">{metodo.label}</span>
                  </label>
                ))}
              </div>

              {pago === "tarjeta" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 border border-gray-200 rounded-xl p-5 bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    💠 Información de la tarjeta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="numero"
                      value={tarjeta.numero}
                      onChange={handleCardChange}
                      placeholder="Número de tarjeta (16 dígitos)"
                      maxLength={16}
                      required
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="nombre"
                      value={tarjeta.nombre}
                      onChange={handleCardChange}
                      placeholder="Nombre del titular"
                      required
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="vencimiento"
                      value={tarjeta.vencimiento}
                      onChange={handleCardChange}
                      placeholder="MM/AA"
                      maxLength={5}
                      required
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="text"
                      name="cvv"
                      value={tarjeta.cvv}
                      onChange={handleCardChange}
                      placeholder="CVV"
                      maxLength={3}
                      required
                      className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-600 flex items-center gap-1 hover:text-blue-600"
                >
                  <ArrowLeft size={18} /> Volver
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  {loading ? "Procesando..." : `Confirmar y Pagar S/ ${total.toFixed(2)}`}
                </button>
              </div>

              {mensaje && (
                <p className="text-center text-sm text-gray-700 mt-3">
                  {mensaje}
                </p>
              )}
            </motion.div>
          )}

          {/* PASO 3: Confirmación */}
          {step === 3 && (
            <motion.div
              key="confirmacion"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center py-12"
            >
              <CheckCircle size={70} className="text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                ¡Gracias por tu compra! 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                Tu orden ha sido registrada correctamente.
              </p>
              {orderId && (
                <p className="text-sm text-gray-500 mb-6">
                  Número de orden:{" "}
                  <span className="font-semibold">{orderId}</span>
                </p>
              )}
              <button
                onClick={() => navigate("/productos-vista")}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Volver a la tienda
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
