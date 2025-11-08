import { Phone, Mail, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Columna 1 */}
        <div>
          <h3 className="text-xl font-bold mb-4">ALTech</h3>
          <p className="text-gray-200">
            Tu tienda de confianza para los mejores celulares y tecnología.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Productos</h4>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#" className="hover:text-white">iPhone</a></li>
            <li><a href="#" className="hover:text-white">Samsung</a></li>
            <li><a href="#" className="hover:text-white">Google Pixel</a></li>
            <li><a href="#" className="hover:text-white">Xiaomi</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Soporte</h4>
          <ul className="space-y-2 text-gray-200">
            <li><a href="#" className="hover:text-white">Centro de Ayuda</a></li>
            <li><a href="#" className="hover:text-white">Garantía</a></li>
            <li><a href="#" className="hover:text-white">Envíos</a></li>
            <li><a href="#" className="hover:text-white">Devoluciones</a></li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contacto</h4>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center gap-2">
              <Phone size={18} className="text-white" />
              <span>+51 999 888 777</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-white" />
              <span>info@altech.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} className="text-white" />
              <span>Pucallpa, Perú</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mt-10 border-t border-blue-400 pt-6 text-center text-gray-100 text-sm">
        © 2024 ALTech. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
