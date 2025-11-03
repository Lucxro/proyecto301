import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home(){
    const [token, setToken] = useState(null);
    useEffect(() =>{
        const storedToken = localStorage.getItem('autnToken');
        if(storedToken){
            setToken(storedToken);
        }
    }), [];

    const handleLogout = () =>{
        localStorage.removeItem('authToken');
        setToken(null);
    }

    return(
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-4">Bienvenida a mi pagina 💙</h1>
            {(token && (
                <button onClick={handleLogout}
                className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600">Cerrar sesión</button>
            )
            )}
            {token ? (
                <div>
                    <p className="text-green-600 text-xl">Haz iniciado exitosamente</p>
                </div>
            ):(
                <div>
                    <p className="text-red-600 text-xl">Parece que no haz iniciado sesión</p>
                    <Link to='/Login' className="mt-4 inline-bock text-blue-500">Ir a la página de Login</Link>
                </div>
            )}
            <p className="text-blue-600 text-xl">Esta es nuestra aplicacion de tienda de celulares 📱</p>
        </div>
    );
}

export default Home;