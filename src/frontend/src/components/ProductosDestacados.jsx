function ProductosDestacados() {
  const productos = [
    {
      name: "iPhone 15 Pro",
      price: "$1,199",
      img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-blue-titanium",
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      price: "$999",
      img: "https://images.samsung.com/is/image/samsung/p6pim/levant/2302/gallery/levant-galaxy-s23-ultra-s918-sm-s918bzgcmea-534086537",
    },
    {
      name: "Google Pixel 8 Pro",
      price: "$899",
      img: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel8-pro-1.jpg",
    },
  ];

  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Productos Destacados</h2>
      <p className="text-gray-600 mb-10">
        Descubre los últimos modelos de celulares con la mejor tecnología y precios increíbles
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {productos.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition duration-300"
          >
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-blue-600 font-bold">{product.price}</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductosDestacados;
