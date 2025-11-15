import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const avatar = searchParams.get("avatar");

    if (token) {
      console.log("Token recibido y guardado", token);

      // Guardar Token
      localStorage.setItem("authToken", token);
      
      const safeValue = (val) =>
        val && val !== "null" && val !== "undefined" ? val : "";

      const userData = {
        name: safeValue(name),
        email: safeValue(email),
        avatar: safeValue(avatar),
      };

      // Guardar datos del usuario
      localStorage.setItem("userData", JSON.stringify(userData));


      navigate("/", { replace: true });
    } else {
      console.log("No hay token se envia de nuevo a login");
      console.error("No se recibio ningun token");
      navigate("/login", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-xl">Autenticando, por favor espere...</p>
    </div>
  );
}

export default LoginSuccess;
