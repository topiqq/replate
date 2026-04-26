import { useState, useEffect } from "react";

/* ─── DATA STATIS ────────────────── */
const allOrders = [
  {
    id: "#RP001",
    item: "Mystery Bag Bakery",
    seller: "Roti Enakk",
    emoji: "🥐",
    price: "Rp15.000",
    status: "Diproses",
    statusColor: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    date: "Hari ini",
    time: "10:32",
    tab: "aktif",
  },
  {
    id: "#RP002",
    item: "Nasi Box Surplus",
    seller: "Warung Hemat",
    emoji: "🍱",
    price: "Rp12.000",
    status: "Siap Diambil",
    statusColor: "bg-green-100 text-green-700",
    dot: "bg-green-500",
    date: "Hari ini",
    time: "11:05",
    tab: "aktif",
  },
  {
    id: "#RP003",
    item: "Paket Roti Mix",
    seller: "Bakery Fresh",
    emoji: "🍞",
    price: "Rp10.000",
    status: "Selesai",
    statusColor: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
    date: "Kemarin",
    time: "09:20",
    tab: "selesai",
  },
];

const partnerData = [
  {
    id: 1,
    name: "Bakery Fresh",
    emoji: "🥐",
    items: 5,
    sold: 23,
    revenue: "Rp345.000",
    rating: 4.8,
    color: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    products: [
      { name: "Paket Roti Mix", price: "Rp10.000", stock: 8, sold: 14 },
      { name: "Croissant Sisa", price: "Rp8.000", stock: 4, sold: 6 },
    ],
  },
];

/* ─── KOMPONEN KECIL ────────────────────────────────────── */
function StatusBadge({ statusColor, dot, status }) {
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 ${statusColor}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot} inline-block`} />
      {status}
    </span>
  );
}

// ─── SECTION: BERANDA ────────────────────────────────────
function HomeSection({ foods, onOrder, added, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Memuat makanan lezat...</p>
      </div>
    );
  }

  if (!foods || foods.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
        <p className="text-5xl mb-4">🍽️</p>
        <h3 className="text-lg font-bold text-gray-800">
          Belum ada makanan tersedia
        </h3>
        <p className="text-gray-500">
          Cek lagi nanti ya, jangan sampai kehabisan!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-green-600 rounded-2xl p-6 text-white relative overflow-hidden mb-8">
        <div className="absolute -right-6 -top-6 w-40 h-40 bg-green-500 rounded-full opacity-50" />
        <div className="relative z-10">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
            🌍 Kurangi Food Waste Sekarang
          </span>
          <h2 className="text-2xl font-bold mb-1">Hemat hingga 70%</h2>
          <p className="text-green-100 text-sm mb-4">
            Makanan enak, harga bersahabat, planet lebih baik.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative">
              <span className="text-6xl">{food.emoji || "🍱"}</span>
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-400 mb-0.5">{food.seller}</p>
              <h3 className="text-base font-bold text-gray-800 mb-2">
                {food.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-green-600 font-bold text-lg">
                  Rp{Number(food.surplus_price).toLocaleString("id-ID")}
                </p>
                <p className="line-through text-gray-400 text-sm font-medium">
                  Rp{Number(food.original_price).toLocaleString("id-ID")}
                </p>
              </div>
              <button
                onClick={() => onOrder(food.id)}
                className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${added[food.id] ? "bg-green-100 text-green-700" : "bg-green-600 text-white"}`}
              >
                {added[food.id] ? "✓ Ditambahkan!" : "Pesan Sekarang"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// (Catatan: OrdersSection dan PartnerSection tetap sama seperti kodemu sebelumnya)
// ... [OrdersSection dan PartnerSection kamu masukkan di sini] ...

/* ─── APP UTAMA ─────────────────────────────────────────── */
export default function RePlateMVP() {
  // HOOKS HARUS DI DALAM FUNGSI INI
  const [activeNav, setActiveNav] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [added, setAdded] = useState({});
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/foods")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleOrder = (id) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    setCartCount((c) => c + 1);
    setTimeout(() => setAdded((prev) => ({ ...prev, [id]: false })), 1500);
  };

  const navItems = [
    { id: "home", icon: "🏠", label: "Beranda" },
    { id: "orders", icon: "📦", label: "Pesanan" },
    { id: "partner", icon: "🤝", label: "Partner" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">♻</span>
            </div>
            <h1 className="text-xl font-bold text-green-700">Re-Plate</h1>
          </div>
          <button className="relative w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center">
            <span className="text-lg">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 text-white text-[10px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="max-w-4xl w-full mx-auto px-5 pt-6 pb-24 flex-1">
        {/* PERHATIKAN: Sekarang props foods dan loading dikirimkan ke HomeSection */}
        {activeNav === "home" && (
          <HomeSection
            foods={foods}
            onOrder={handleOrder}
            added={added}
            loading={loading}
          />
        )}
        {/* Render section lain jika diperlukan */}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 flex justify-around md:hidden">
        {navItems.map((n) => (
          <button
            key={n.id}
            onClick={() => setActiveNav(n.id)}
            className={`flex flex-col items-center gap-0.5 ${activeNav === n.id ? "text-green-600" : "text-gray-400"}`}
          >
            <span className="text-xl">{n.icon}</span>
            <span className="text-[10px] font-medium">{n.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
