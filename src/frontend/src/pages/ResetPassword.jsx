import { useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar mensajes
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,        
          newPassword,   
        }),
      });

      const data = await res.json();

      console.log("RESPUESTA DEL SERVIDOR:", data);

      if (res.ok) {
        setMessage(data.message || "Contraseña actualizada");
      } else {
        setError(data.message || "Error al cambiar la contraseña");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h2>Restablecer contraseña</h2>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 15,
            borderRadius: 8,
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Guardar nueva contraseña
        </button>
      </form>

      {message && <p style={{ marginTop: 20, color: "green" }}>{message}</p>}

      {error && <p style={{ marginTop: 20, color: "red" }}>{error}</p>}

      <Link to="/login" style={{ display: "block", marginTop: 30 }}>
        Volver al login
      </Link>
    </div>
  );
}
