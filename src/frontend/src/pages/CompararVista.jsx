import { useCompare } from "@/context/CompareContext";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Comparar Productos</h1>
      <p>Compara hasta 4 productos lado a lado.</p>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {compareList.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="font-semibold mt-2">{product.name}</h3>
            <p>${product.price}</p>
            <button
              onClick={() => removeFromCompare(product.id)}
              className="text-red-500 text-sm mt-2"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      {compareList.length > 0 && (
        <div className="mt-6">
          <button
            onClick={clearCompare}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Limpiar Comparación
          </button>
        </div>
      )}
    </div>
  );
}
