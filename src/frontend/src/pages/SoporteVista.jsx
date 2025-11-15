import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

export default function SoporteVista() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    categoria: "",
    asunto: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeExito("");

    try {
      const res = await fetch("http://localhost:3000/api/soporte/mensajes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar mensaje");

      setMensajeExito("Tu mensaje fue enviado exitosamente. Te contactaremos pronto.");
      setFormData({ nombre: "", email: "", categoria: "", asunto: "", mensaje: "" });
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al enviar el mensaje. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <div className="pt-28 pb-5 bg-gray-50 min-h-screen">
        {/* 🔹 Botón Volver */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver
          </button>
        </div>

        {/* 🔹 Encabezado */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Centro de Soporte
          </h1>
          <p className="text-gray-600 text-lg">
            Estamos aquí para ayudarte. Encuentra respuestas rápidas o contáctanos directamente.
          </p>
        </div>

        {/* 🔹 Métodos de contacto */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 px-4">
          {[
            {
              icon: "💬",
              titulo: "Chat en Vivo",
              desc: "Respuesta inmediata",
              horario: "Lun - Vie: 9:00 AM - 8:00 PM",
              boton: "Iniciar Chat",
            },
            {
              icon: "📞",
              titulo: "Teléfono",
              desc: "+51 1 234-5678",
              horario: "Lun - Sáb: 8:00 AM - 9:00 PM",
              boton: "Llamar Ahora",
            },
            {
              icon: "✉️",
              titulo: "Email",
              desc: "soporte@altech.com",
              horario: "Respuesta en 24 horas",
              boton: "Enviar Email",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 p-8 text-center border border-gray-100"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.titulo}
              </h3>
              <p className="text-gray-500 mb-1">{item.desc}</p>
              <p className="text-gray-400 text-sm mb-4">{item.horario}</p>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition">
                {item.boton}
              </button>
            </div>
          ))}
        </div>

        {/* 🔹 Formulario + Preguntas Frecuentes */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 px-4 mb-16">
          {/* Formulario */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-md p-8 border border-gray-100"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Envíanos un Mensaje
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Completa el formulario y te responderemos lo antes posible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Tu nombre completo"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mb-4 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una categoría</option>
              <option value="envios">Envíos y Entregas</option>
              <option value="garantias">Garantías</option>
              <option value="pagos">Pagos y Facturación</option>
              <option value="general">Ayuda General</option>
            </select>

            <input
              name="asunto"
              type="text"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Describe brevemente tu consulta"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mb-4 focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              placeholder="Describe tu consulta en detalle..."
              required
              rows={4}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full mb-6 focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {enviando ? "Enviando..." : "Enviar Mensaje"}
            </button>

            {mensajeExito && (
              <p className="text-green-600 text-sm mt-4">{mensajeExito}</p>
            )}
          </form>

          {/* Preguntas Frecuentes */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Preguntas Frecuentes
            </h2>

            {[
              {
                q: "¿Cuál es el tiempo de entrega?",
                a: "Realizamos entregas en 24-48 horas en Lima y 3-5 días laborables en provincias.",
              },
              {
                q: "¿Ofrecen garantía en los productos?",
                a: "Sí, todos nuestros productos tienen garantía oficial del fabricante de 12 meses.",
              },
              {
                q: "¿Puedo cambiar mi pedido después de comprarlo?",
                a: "Puedes cambiar tu pedido dentro de las primeras 2 horas después de la compra.",
              },
              {
                q: "¿Hacen entregas a domicilio?",
                a: "Sí, realizamos entregas a domicilio en todo el país con tracking en tiempo real.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="mb-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
              >
                <h3 className="font-medium text-gray-800 mb-1">❓ {item.q}</h3>
                <p className="text-gray-500 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Categorías de soporte */}
        <div className="max-w-6xl mx-auto px-4 text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Categorías de Soporte
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "🚚", title: "Envíos y Entregas", desc: "Información sobre tu pedido" },
              { icon: "🛡️", title: "Garantías", desc: "Soporte técnico y garantías" },
              { icon: "💳", title: "Pagos y Facturación", desc: "Problemas con pagos" },
              { icon: "❔", title: "Ayuda General", desc: "Otras consultas" },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-md hover:shadow-lg p-6 border border-gray-100"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 🔹 Información adicional */}
        <div className="max-w-6xl mx-auto bg-gray-100 rounded-3xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-2xl mb-2">📍</p>
            <h3 className="font-semibold text-gray-800 mb-2">Tienda Física</h3>
            <p className="text-gray-600 text-sm">
              Av. San Martin 123, Pucallpa, Ucayali
            </p>
            <p className="text-gray-400 text-sm">Lun - Sab: 9:00 AM - 7:30 PM</p>
          </div>

          <div>
            <p className="text-2xl mb-2">⏰</p>
            <h3 className="font-semibold text-gray-800 mb-2">Horarios de Atención</h3>
            <p className="text-gray-600 text-sm">
              Lunes a Viernes: 9:00 AM - 7:30 PM
            </p>
            <p className="text-gray-400 text-sm">
              Sábados: 10:00 AM - 6:00 PM | Domingos: 11:00 AM - 5:00 PM
            </p>
          </div>

          <div>
            <p className="text-2xl mb-2">🛠️</p>
            <h3 className="font-semibold text-gray-800 mb-2">Garantía</h3>
            <p className="text-gray-600 text-sm">12 meses de garantía oficial</p>
            <p className="text-gray-400 text-sm">
              Soporte técnico especializado y post-venta
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
