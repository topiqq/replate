import { useState, useEffect } from "react";

/* ─── KOMPONEN: LANDING PAGE (BELUM LOGIN) ──────────────── */
function LandingPage({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black text-green-600">Re-Plate</h1>
        <button
          onClick={onLoginClick}
          className="bg-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-green-700 transition-all"
        >
          Masuk / Daftar
        </button>
      </nav>
      <main className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
            📍 Malang Food Waste Movement
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-6 leading-tight">
            Solusi Makanan Murah untuk{" "}
            <span className="text-green-600">UMKM Malang.</span>
          </h2>
          <p className="text-gray-500 mt-6 text-lg max-w-lg">
            Bantu restoran mengurangi limbah pangan dan dapatkan bahan baku
            kualitas resto dengan harga teman.
          </p>
          <button
            onClick={onLoginClick}
            className="mt-10 bg-gray-900 text-white px-10 py-5 rounded-[2rem] text-xl font-bold shadow-2xl hover:scale-105 transition-all"
          >
            Mulai Selamatkan Makanan
          </button>
        </div>
        <div className="flex-1 bg-green-50 rounded-[3rem] p-12 flex items-center justify-center text-[10rem]">
          🍱
        </div>
      </main>
    </div>
  );
}

function AuthSection({ onAuthSubmit, onBack }) {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState("umkm");
  // State untuk menampung input sesuai kolom DB
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shop_name: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kirim objek formData lengkap ke handleAuth
    onAuthSubmit(formData, isRegister, role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white p-10 rounded-[3rem] shadow-xl border border-gray-100">
        <button
          onClick={onBack}
          className="text-gray-400 mb-6 font-bold hover:text-gray-600"
        >
          ← Kembali
        </button>
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          {isRegister ? "Buat Akun" : "Selamat Datang"}
        </h2>

        {isRegister && (
          <div className="flex gap-4 my-6">
            <button
              type="button"
              onClick={() => setRole("umkm")}
              className={`flex-1 py-3 rounded-2xl border-2 font-bold transition-all ${role === "umkm" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-100 text-gray-400"}`}
            >
              🍱 UMKM
            </button>
            <button
              type="button"
              onClick={() => setRole("partner")}
              className={`flex-1 py-3 rounded-2xl border-2 font-bold transition-all ${role === "partner" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-100 text-gray-400"}`}
            >
              🤝 Partner
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="Nama Lengkap"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Nama Toko/Warung (Opsional)"
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, shop_name: e.target.value })
                }
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-6 py-4 rounded-2xl bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full py-5 bg-green-600 text-white rounded-2xl font-black text-lg mt-4 shadow-lg uppercase tracking-wider"
          >
            {isRegister ? "Daftar" : "Masuk"}
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-bold text-gray-400">
          {isRegister ? "Sudah punya akun?" : "Belum punya akun?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-green-600 ml-2"
          >
            {isRegister ? "Masuk" : "Daftar"}
          </button>
        </p>
      </div>
    </div>
  );
}

/* ─── APP UTAMA ─────────────────────────────────────────── */
export default function RePlateMVP() {
  const [view, setView] = useState("landing"); // landing, auth, dashboard
  const [userRole, setUserRole] = useState(null); // umkm atau partner
  const [activeNav, setActiveNav] = useState("home");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleAuth = async (formData, isRegister, role) => {
    const endpoint = isRegister ? "/api/register" : "/api/login";

    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Kirim data lengkap termasuk name dan shop_name untuk DB
        body: JSON.stringify({
          ...formData,
          role: role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("replate_token", data.access_token); //
        setUserRole(data.user.role); //
        setView("dashboard");
      } else {
        alert(data.message || "Gagal Autentikasi");
      }
    } catch (error) {
      console.error("Koneksi gagal:", error);
      alert("Pastikan server Laravel sudah menyala!");
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/api/foods")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // TAMPILAN: LANDING PAGE
  if (view === "landing")
    return <LandingPage onLoginClick={() => setView("auth")} />;

  // TAMPILAN: LOGIN/REGISTER
  if (view === "auth")
    return (
      <AuthSection
        onAuthSubmit={handleAuth}
        onBack={() => setView("landing")}
      />
    );

  // TAMPILAN: DASHBOARD (SETELAH LOGIN)
  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-green-700">
            Re-Plate{" "}
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-lg text-gray-500 ml-2 uppercase">
              {userRole}
            </span>
          </h1>
          <button
            onClick={() => setView("landing")}
            className="text-gray-400 font-bold hover:text-red-500 transition-colors"
          >
            Keluar 🚪
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-8 pt-10 pb-32 flex-1">
        {userRole === "umkm" ? (
          <HomeSection
            foods={foods}
            loading={loading}
            onViewDetail={setSelectedFood}
          />
        ) : (
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-black mb-4">Manajemen Stok Toko</h2>
            <button className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold mb-6">
              + Tambah Makanan Surplus
            </button>
          </div>
        )}
      </main>

      {/* Navigasi Dashboard melayang di bawah */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 rounded-[2.5rem] p-4 flex gap-12 shadow-2xl z-50">
        <button
          onClick={() => setActiveNav("home")}
          className={`flex flex-col items-center ${activeNav === "home" ? "text-green-400" : "text-gray-500"}`}
        >
          <span className="text-xl">🏠</span>
          <span className="text-[9px] font-bold mt-1 uppercase">Home</span>
        </button>
        {userRole === "partner" && (
          <button
            onClick={() => setActiveNav("inventory")}
            className={`flex flex-col items-center ${activeNav === "inventory" ? "text-green-400" : "text-gray-500"}`}
          >
            <span className="text-xl">📦</span>
            <span className="text-[9px] font-bold mt-1 uppercase">
              Stok Saya
            </span>
          </button>
        )}
      </nav>
    </div>
  );
}
