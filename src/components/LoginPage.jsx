// ─────────────────────────────────────────────
//  components/LoginPage.jsx
// ─────────────────────────────────────────────

import { useState } from "react";
import { authApi } from "../services/api";

const C = {
  cream: "#F5F0E8",
  green: "#2D5016",
  greenFaint: "#EAF2D8",
  text: "#1A1A0F",
  textMuted: "#6B6B52",
  border: "rgba(45,80,22,0.15)",
  red: "#B83232",
  redLight: "#F5DADA",
};

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      // Laravel Sanctum mengembalikan: { token, user: { id, name, email, role, shop_name } }
      onLogin(res.user, res.token);
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "36px 40px",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 20,
              margin: "0 auto 12px",
            }}
          >
            R
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.green,
            }}
          >
            Re-Plate
          </h1>
          <p style={{ fontSize: 13, color: C.textMuted, marginTop: 4 }}>
            Masuk ke akun Partner atau Admin kamu
          </p>
        </div>

        {error && (
          <div
            style={{
              background: C.redLight,
              color: C.red,
              padding: "10px 14px",
              borderRadius: 9,
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                display: "block",
                marginBottom: 5,
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${C.border}`,
                borderRadius: 9,
                fontSize: 13,
                background: C.cream,
                color: C.text,
                outline: "none",
              }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                display: "block",
                marginBottom: 5,
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                border: `1px solid ${C.border}`,
                borderRadius: 9,
                fontSize: 13,
                background: C.cream,
                color: C.text,
                outline: "none",
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              borderRadius: 9,
              border: "none",
              background: loading ? "#6B9E3A" : C.green,
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Masuk..." : "Masuk →"}
          </button>
        </form>
      </div>
    </div>
  );
}
