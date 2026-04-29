import { useState, useEffect } from "react";
import { authApi } from "./services/api";
import PartnerDashboard from "./components/partner/PartnerDashboard";
import LoginPage from "./components/LoginPage";

export default function App() {
  // user = null  → belum login
  // user = {...} → sudah login, role tersedia
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // cek token saat mount

  // ── Cek token yang tersimpan saat app pertama load ──
  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    const savedToken = localStorage.getItem("auth_token");

    if (savedToken && savedUser) {
      // Verifikasi token ke backend sebelum percaya
      authApi
        .me()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          // Token tidak valid → bersihkan
          localStorage.removeItem("auth_token");
          localStorage.removeItem("auth_user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ── Handler login dari LoginPage ──
  const handleLogin = (userData, token) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    setUser(userData);
  };

  // ── Handler logout ──
  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (_) {
      // Tetap logout meski request gagal
    } finally {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      setUser(null);
    }
  };

  // ── Loading screen ──
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5F0E8",
          fontFamily: "sans-serif",
          color: "#6B6B52",
          fontSize: 14,
        }}
      >
        Memuat Re-Plate...
      </div>
    );
  }

  // ── Belum login → tampilkan halaman login ──
  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // ── Routing berdasarkan role ──
  // Saat ini hanya role "partner" dan "admin" → PartnerDashboard
  // Tambahkan UMKMDashboard di sini nanti:
  //   if (user.role === "umkm") return <UMKMDashboard user={user} onLogout={handleLogout} />;
  if (user.role === "partner" || user.role === "admin") {
    return <PartnerDashboard user={user} onLogout={handleLogout} />;
  }

  // Fallback: role tidak dikenal
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F0E8",
        fontFamily: "sans-serif",
        color: "#B83232",
        fontSize: 14,
      }}
    >
      Role tidak dikenal: "{user.role}". Hubungi admin.
    </div>
  );
}
