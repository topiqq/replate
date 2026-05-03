import { useState, useEffect } from "react";
import { authApi } from "./services/api";
import PartnerDashboard from "./components/partner/PartnerDashboard";
import BuyerDashboard from "./components/buyer/BuyerDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import LoginPage from "./components/LoginPage";
import LandingPage from "./components/LandingPage";

export default function App() {
  // user = null  → belum login
  // user = {...} → sudah login, role tersedia
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // cek token saat mount
  const [showLogin, setShowLogin] = useState(false); // kontrol tampilan landing vs login

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

  // ── Belum login → tampilkan landing page atau login page ──
  if (!user) {
    if (!showLogin) {
      return <LandingPage onGetStarted={() => setShowLogin(true)} />;
    }
    return (
      <LoginPage onLogin={handleLogin} onBack={() => setShowLogin(false)} />
    );
  }

  // ── Routing berdasarkan role ──
  if (user.role === "partner") {
    return <PartnerDashboard user={user} onLogout={handleLogout} />;
  }

  if (user.role === "buyer") {
    return <BuyerDashboard user={user} onLogout={handleLogout} />;
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={handleLogout} />;
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
