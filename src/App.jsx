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

function AdminDashboard({ user }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-gray-900">Portal Admin Re-Plate</h1>
          <p className="text-gray-500">Halo, {user.name}. Anda masuk sebagai Administrator.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-400 uppercase">Total UMKM</span>
            <p className="text-4xl font-black text-green-600">24</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-400 uppercase">Pesanan Aktif</span>
            <p className="text-4xl font-black text-green-600">156</p>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <span className="text-sm font-bold text-gray-400 uppercase">Laporan Surplus</span>
            <p className="text-4xl font-black text-green-600">1.2 Ton</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-4">Manajemen Sistem</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-green-50 text-green-700 rounded-2xl font-bold hover:bg-green-100 transition">Verifikasi Mitra Baru</button>
            <button className="p-4 bg-gray-50 text-gray-700 rounded-2xl font-bold hover:bg-green-100 transition">Log Aktivitas Sistem</button>
          </div>
        </div>
      </div>
    </div>
  )
}
function UserDashboard({ user }) {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              Halo, {user.shop_name || user.name}! 🍱
            </h1>
            <p className="text-gray-500">
              Panel Kendali {user.role === 'partner' ? 'Restoran' : 'UMKM'}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box Kiri: Berdasarkan Role */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">
              {user.role === 'partner' ? 'Donasi Makanan Baru' : 'Cari Makanan Tersedia'}
            </h3>
            <button className="w-full py-4 bg-green-600 text-white rounded-xl font-bold">
              {user.role === 'partner' ? '+ Tambah Surplus' : 'Lihat Katalog'}
            </button>
          </div>

          {/* Box Kanan: Riwayat */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Pesanan Aktif</h3>
            <p className="text-gray-400 italic">Belum ada aktivitas saat ini.</p>
          </div>
        </div>
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // Pastikan semua key ini ada dan dipisahkan koma
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
          shop_name: formData.shop_name, // Tambahkan ini dengan teliti
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("replate_token", data.access_token);
        setUser(data.user);
        setUserRole(data.user.role);
        setView("dashboard");
      } else {
        alert(data.message || "Gagal Autentikasi");
      }
    } catch (error) {
      console.error("Koneksi gagal:", error);
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
              {user?.role ?? '-'}
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

      <main className="flex-1">
        {view === "dashboard" && (
          <>
            {user?.role === "admin" ? (
              <AdminDashboard user={user} />
            ) : (
              <UserDashboard user={user} />
            )}
          </>
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
