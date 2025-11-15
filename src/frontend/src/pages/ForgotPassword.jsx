import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        setMessage("Error del servidor");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Error al enviar el correo");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: 20 }}>
      <h2>Recuperar contraseña</h2>
      <p>Ingresa tu correo para enviarte un enlace de recuperación.</p>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <input
          type="email"
          placeholder="Tu correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          disabled={loading}
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
          {loading ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      {message && <p style={{ marginTop: 20, color: "green" }}>{message}</p>}

      <Link to="/login" style={{ display: "block", marginTop: 30 }}>
        Volver al login
      </Link>
    </div>
  );
}
