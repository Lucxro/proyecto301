// src/components/VerTodosButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function VerTodosButton({ ruta = "/productos-vista", texto = "Ver Todos los Productos" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(ruta)}
      className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-300"
    >
      {texto}
    </button>
  );
}

export default VerTodosButton;
