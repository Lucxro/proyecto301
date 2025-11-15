import { createContext, useContext, useState, useEffect } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem("compareList");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    setCompareList((prev) => {
      // evitar duplicados
      if (prev.find((item) => item.id === product.id)) return prev;

      // máximo 4 productos
      if (prev.length >= 4) {
        import("react-hot-toast").then(({ toast }) => {
          toast.error(
            "⚠️ No se pudo añadir: límite de 4 productos en comparación.",
            {
              position: "bottom-right",
              style: {
                background: "#dc2626",
                color: "#fff",
                borderRadius: "10px",
                padding: "10px 15px",
              },
            }
          );
        });
        return prev;
      }

      return [...prev, product];
    });
  };

  const removeFromCompare = (id) => {
    setCompareList((prev) => prev.filter((item) => item.id !== id));
  };

  const isInCompare = (id) => {
    return compareList.some((p) => p.id === id);
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error("useCompare debe usarse dentro de CompareProvider");
  }
  return context;
}
