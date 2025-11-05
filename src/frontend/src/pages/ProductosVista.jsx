import Navbar from "./Navbar";
function ProductosVista({ token, handleLogout }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar token={token} onLogout={handleLogout} />
    </div>
  );
}

export default ProductosVista;