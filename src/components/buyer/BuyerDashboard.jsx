import { useState } from "react";

const C = {
  cream: "#F5F0E8",
  creamDark: "#EDE7D9",
  green: "#2D5016",
  greenMid: "#3D6B1F",
  greenLight: "#6B9E3A",
  greenPale: "#D4E8B8",
  greenFaint: "#EAF2D8",
  amber: "#C4760A",
  amberLight: "#F5E4C0",
  red: "#B83232",
  redLight: "#F5DADA",
  text: "#1A1A0F",
  textMuted: "#6B6B52",
  textFaint: "#9B9B7A",
  border: "rgba(45,80,22,0.15)",
  borderStrong: "rgba(45,80,22,0.3)",
  white: "#FFFFFF",
};

const fmt = (n) => "Rp " + Number(n).toLocaleString("id-ID");

// ── Status Badge ──
function StatusBadge({ status }) {
  const map = {
    Diproses: { bg: "#E0EDFF", color: "#1A4A8A" },
    Selesai: { bg: C.greenFaint, color: C.green },
    Dibatalkan: { bg: C.redLight, color: C.red },
  };
  const s = map[status] || map.Diproses;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 10px",
        borderRadius: 20,
      }}
    >
      {status}
    </span>
  );
}

// ── Navbar ──
function BuyerNavbar({ user, onLogout }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      style={{
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        padding: "12px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: C.green }}>
        Re-Plate
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 13 }}>
        <span style={{ color: C.textMuted }}>Hi, {user.name}</span>
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              background: C.greenFaint,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: "6px 12px",
              color: C.green,
              fontWeight: 600,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            Menu ▼
          </button>
          {showMenu && (
            <div
              style={{
                position: "absolute",
                top: 32,
                right: 0,
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 10,
              }}
            >
              <button
                onClick={() => {
                  onLogout();
                  setShowMenu(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 16px",
                  border: "none",
                  background: "none",
                  textAlign: "left",
                  fontSize: 13,
                  color: C.red,
                  fontWeight: 600,
                  cursor: "pointer",
                  borderTop: `1px solid ${C.border}`,
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Sidebar ──
function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "catalog", label: "Katalog Makanan" },
    { id: "orders", label: "Riwayat Pesanan" },
    { id: "profile", label: "Profil & Verifikasi" },
  ];

  return (
    <div
      style={{
        width: 220,
        background: C.green,
        color: C.white,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: "calc(100vh - 60px)",
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: 8,
            border: "none",
            background: activeTab === tab.id ? C.greenLight : "transparent",
            color: C.white,
            fontSize: 13,
            fontWeight: activeTab === tab.id ? 700 : 500,
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s",
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ── Catalog Tab (TODO: penting) ──
function CatalogTab() {
  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.green, marginBottom: 20 }}>
        Katalog Makanan Surplus
      </h2>
      <div
        style={{
          background: C.greenFaint,
          border: `2px dashed ${C.green}`,
          borderRadius: 12,
          padding: "40px 20px",
          textAlign: "center",
          color: C.textMuted,
        }}
      >
        <p style={{ fontSize: 14, marginBottom: 10 }}>
          Fitur katalog makanan surplus sedang dikembangkan
        </p>
        <p style={{ fontSize: 12 }}>
          Anda akan bisa melihat makanan surplus dari partner restoran, filter kategori, melihat harga asli vs surplus, stok & perbandinggan harga
        </p>
      </div>
    </div>
  );
}

// ── Orders Tab (TODO: penting) ──
function OrdersTab() {
  const sampleOrders = [
    {
      id: "ORD-001",
      restaurant: "Restoran Berkah",
      items: "Nasi Kuning + Lele Goreng",
      status: "Selesai",
      total: 45000,
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      restaurant: "Bakery Segar",
      items: "Roti Tawar",
      status: "Diproses",
      total: 25000,
      date: "2024-01-14",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.green, marginBottom: 20 }}>
        Riwayat Pesanan
      </h2>

      {sampleOrders.length === 0 ? (
        <div
          style={{
            background: C.greenFaint,
            borderRadius: 12,
            padding: "40px 20px",
            textAlign: "center",
            color: C.textMuted,
          }}
        >
          Belum ada pesanan. Jelajahi katalog makanan surplus sekarang!
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sampleOrders.map((order) => (
            <div
              key={order.id}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                  {order.id} - {order.restaurant}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 6 }}>
                  {order.items}
                </div>
                <div style={{ fontSize: 11, color: C.textFaint }}>
                  {new Date(order.date).toLocaleDateString("id-ID")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.green, marginBottom: 4 }}>
                    {fmt(order.total)}
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Profile Tab (TODO: wajib) ──
function ProfileTab() {
  const [verified, setVerified] = useState(false);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.green, marginBottom: 20 }}>
        Profil & Verifikasi Identitas
      </h2>

      <div
        style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: "20px",
          marginBottom: 20,
        }}
      >
        <div style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>
            Status Verifikasi
          </h3>
          <div
            style={{
              background: verified ? C.greenFaint : C.amberLight,
              border: `1px solid ${verified ? C.green : C.amber}`,
              borderRadius: 8,
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: 13,
                color: verified ? C.green : C.amber,
                fontWeight: 600,
              }}
            >
              {verified ? "Akun Terverifikasi ✓" : "Akun Belum Terverifikasi"}
            </span>
            {!verified && (
              <button
                onClick={() => setVerified(true)}
                style={{
                  background: C.amber,
                  border: "none",
                  borderRadius: 6,
                  color: C.white,
                  padding: "6px 12px",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Verifikasi Sekarang
              </button>
            )}
          </div>
        </div>

        {!verified && (
          <div
            style={{
              background: C.cream,
              borderRadius: 8,
              padding: "16px",
              fontSize: 12,
              color: C.textMuted,
              lineHeight: "1.6",
            }}
          >
            <p style={{ marginBottom: 12 }}>
              Untuk memastikan keamanan platform, silakan upload dokumen identitas Anda:
            </p>
            <ul style={{ marginLeft: "20px", marginBottom: 12 }}>
              <li>Foto KTP atau SIM (jelas, tidak blur)</li>
              <li>Selfie dengan memegang dokumen identitas</li>
            </ul>
            <p style={{ fontSize: 11, color: C.textFaint }}>
              Status verifikasi akan ditinjau dalam 24 jam oleh tim kami.
            </p>
          </div>
        )}
      </div>

      {/* TODO: penting - Upload foto KTP/SIM & selfie, verification status tracking */}
      <div
        style={{
          background: C.greenFaint,
          border: `2px dashed ${C.green}`,
          borderRadius: 12,
          padding: "40px 20px",
          textAlign: "center",
          color: C.textMuted,
        }}
      >
        <p style={{ fontSize: 14 }}>
          Fitur upload dokumen verifikasi sedang dikembangkan
        </p>
      </div>
    </div>
  );
}

// ── Main Dashboard Component ──
export default function BuyerDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("catalog");

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <BuyerNavbar user={user} onLogout={onLogout} />
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div style={{ flex: 1, background: C.cream, overflow: "auto" }}>
          {activeTab === "catalog" && <CatalogTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </div>
    </div>
  );
}
