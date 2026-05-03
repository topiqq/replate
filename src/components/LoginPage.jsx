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

export default function LoginPage({ onLogin, onBack }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [shopName, setShopName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
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

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      setError("Pilih role terlebih dahulu.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authApi.register({
        name,
        email,
        password,
        role: selectedRole,
        shop_name: shopName || undefined,
      });
      // Laravel Sanctum mengembalikan: { token, user: { id, name, email, role, shop_name } }
      onLogin(res.user, res.token);
    } catch (err) {
      setError(err.message || "Gagal membuat akun.");
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
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          padding: "36px 40px",
          width: "100%",
          maxWidth: 420,
          position: "relative",
        }}
      >
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: C.green,
            }}
          >
            ← Kembali
          </button>
        )}

        <div style={{ textAlign: "center", marginBottom: 28, marginTop: 20 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              overflow: "hidden", // Memastikan gambar tetap di dalam border radius
            }}
          >
            <img
              src="/REPLATE LOGO.png"
              alt="Replate Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
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
            {isSignUp ? "Buat akun baru" : "Masuk ke akun kamu"}
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

        {!isSignUp ? (
          // LOGIN FORM
          <form onSubmit={handleLoginSubmit}>
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

            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 13,
                color: C.textMuted,
              }}
            >
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(true);
                  setError("");
                  setSelectedRole(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: C.green,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Daftar di sini
              </button>
            </div>
          </form>
        ) : (
          // SIGN UP FORM
          <form onSubmit={handleSignUpSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 8,
                }}
              >
                Pilih Role
              </label>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { value: "partner", label: "Partner (Restoran)" },
                  { value: "buyer", label: "Pembeli (UMKM)" },
                ].map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      borderRadius: 9,
                      border: `2px solid ${
                        selectedRole === role.value ? C.green : C.border
                      }`,
                      background:
                        selectedRole === role.value ? C.greenFaint : "#fff",
                      color: selectedRole === role.value ? C.green : C.text,
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

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
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap kamu"
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

            {selectedRole === "partner" && (
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
                  Nama Restoran/Toko
                </label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  placeholder="Nama restoran kamu"
                  required={selectedRole === "partner"}
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
            )}

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
                placeholder="email@gmail.com"
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
              disabled={loading || !selectedRole}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 9,
                border: "none",
                background:
                  loading || !selectedRole ? "#999" : C.green,
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                cursor:
                  loading || !selectedRole ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Mendaftar..." : "Daftar →"}
            </button>

            <div
              style={{
                marginTop: 20,
                textAlign: "center",
                fontSize: 13,
                color: C.textMuted,
              }}
            >
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError("");
                  setSelectedRole(null);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: C.green,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Masuk di sini
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
