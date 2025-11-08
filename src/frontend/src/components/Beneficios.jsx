import { ShoppingCart, Star, User } from "lucide-react";

function Beneficios() {
  const beneficios = [
    {
      icon: <ShoppingCart className="w-8 h-8 text-blue-600" />,
      titulo: "Envío Gratis",
      descripcion: "En compras mayores a $500 en toda la ciudad",
    },
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      titulo: "Garantía Extendida",
      descripcion: "2 años de garantía en todos nuestros productos",
    },
    {
      icon: <User className="w-8 h-8 text-blue-600" />,
      titulo: "Soporte 24/7",
      descripcion: "Atención al cliente disponible todos los días",
    },
  ];

  return (
    <section className="bg-gray-200 py-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {beneficios.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.titulo}</h3>
            <p className="text-gray-600">{item.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Beneficios;
