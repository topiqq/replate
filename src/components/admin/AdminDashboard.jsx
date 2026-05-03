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
    Pending: { bg: "#FFF3CD", color: "#856404" },
    Verified: { bg: C.greenFaint, color: C.green },
    Rejected: { bg: C.redLight, color: C.red },
  };
  const s = map[status] || map.Pending;
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
function AdminNavbar({ user, onLogout }) {
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
        Re-Plate Admin
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "center", fontSize: 13 }}>
        <span style={{ color: C.textMuted }}>Admin: {user.name}</span>
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

// ── Sidebar ──
function Sidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Dashboard Overview" },
    { id: "verification", label: "Verifikasi UMKM & Partner" },
    { id: "transactions", label: "Monitoring Transaksi" },
    { id: "moderation", label: "Moderasi Katalog" },
  ];

  return (
    <div
      style={{
        width: 240,
        background: "#3E3B34",
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
            background: activeTab === tab.id ? "#5A5751" : "transparent",
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

// ── Overview Tab ──
function OverviewTab() {
  const stats = [
    { label: "Total Partner", value: "45", color: C.green },
    { label: "Total UMKM", value: "128", color: C.amber },
    { label: "Total Transaksi", value: "1,234", color: C.greenMid },
    { label: "Kg Makanan Tersimpan", value: "2,450", color: C.greenLight },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>
        Dashboard Overview
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: C.white,
              border: `2px solid ${stat.color}`,
              borderRadius: 12,
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, color: stat.color, marginBottom: 8 }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 12, color: C.textMuted }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* TODO: penting - City-wide impact dashboard, metrics, graphs */}
      <div
        style={{
          background: "#FFF9E6",
          border: `2px dashed ${C.amber}`,
          borderRadius: 12,
          padding: "24px",
          textAlign: "center",
          color: C.textMuted,
        }}
      >
        <p style={{ fontSize: 14, marginBottom: 8 }}>
          Dashboard metric lengkap sedang dikembangkan
        </p>
        <p style={{ fontSize: 12 }}>
          Termasuk: total kg makanan tersimpan, total uang dihemat, grafik trend, performa per kota
        </p>
      </div>
    </div>
  );
}

// ── Verification Tab (TODO: wajib) ──
function VerificationTab() {
  const pendingUsers = [
    {
      id: 1,
      name: "Warung Berkah",
      type: "Partner",
      status: "Pending",
      uploadDate: "2024-01-15",
    },
    {
      id: 2,
      name: "UMKM Kue Ibu Sari",
      type: "Buyer",
      status: "Pending",
      uploadDate: "2024-01-14",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>
        Verifikasi UMKM & Partner
      </h2>

      {pendingUsers.length === 0 ? (
        <div
          style={{
            background: C.greenFaint,
            borderRadius: 12,
            padding: "40px 20px",
            textAlign: "center",
            color: C.textMuted,
          }}
        >
          Semua pengguna sudah terverifikasi
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {pendingUsers.map((user) => (
            <div
              key={user.id}
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
                  {user.name}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>
                  Tipe: {user.type}
                </div>
                <div style={{ fontSize: 11, color: C.textFaint }}>
                  Upload: {new Date(user.uploadDate).toLocaleDateString("id-ID")}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <StatusBadge status={user.status} />
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{
                      background: C.green,
                      border: "none",
                      borderRadius: 6,
                      color: C.white,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    style={{
                      background: C.red,
                      border: "none",
                      borderRadius: 6,
                      color: C.white,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: wajib - View KTP/SIM dokumen, verification form, status tracking */}
    </div>
  );
}

// ── Transactions Tab (TODO: wajib) ──
function TransactionsTab() {
  const transactions = [
    {
      id: "TRX-001",
      seller: "Restoran Berkah",
      buyer: "UMKM Kue Ibu",
      amount: 45000,
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "TRX-002",
      seller: "Bakery Segar",
      buyer: "Toko Cemara",
      amount: 25000,
      status: "Pending",
      date: "2024-01-14",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>
        Monitoring Transaksi
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {transactions.map((trx) => (
          <div
            key={trx.id}
            style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: "16px",
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gap: 16,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                {trx.id}
              </div>
              <div style={{ fontSize: 11, color: C.textFaint }}>
                {new Date(trx.date).toLocaleDateString("id-ID")}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>
                {trx.seller} → {trx.buyer}
              </div>
              <StatusBadge status={trx.status} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.green }}>
                {fmt(trx.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TODO: wajib - Filter transaksi, deteksi anomali, webhook logs, payment gateway monitoring */}
    </div>
  );
}

// ── Moderation Tab (TODO: wajib) ──
function ModerationTab() {
  const flaggedItems = [
    {
      id: 1,
      name: "Nasi Kuning 5kg",
      restaurant: "Restoran Berkah",
      status: "Flagged",
      reason: "Expired date tidak jelas",
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>
        Moderasi Katalog
      </h2>

      {flaggedItems.length === 0 ? (
        <div
          style={{
            background: C.greenFaint,
            borderRadius: 12,
            padding: "40px 20px",
            textAlign: "center",
            color: C.textMuted,
          }}
        >
          Tidak ada item yang perlu dimoderasi
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {flaggedItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: C.white,
                border: `1px solid ${C.amber}`,
                borderRadius: 12,
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 4 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 4 }}>
                  {item.restaurant}
                </div>
                <div style={{ fontSize: 11, color: C.amber, fontWeight: 600 }}>
                  Alasan: {item.reason}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  style={{
                    background: C.green,
                    border: "none",
                    borderRadius: 6,
                    color: C.white,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Approve
                </button>
                <button
                  style={{
                    background: C.red,
                    border: "none",
                    borderRadius: 6,
                    color: C.white,
                    padding: "6px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TODO: wajib - View product detail, set harga, kategori, stock, flag spam, etc */}
    </div>
  );
}

// ── Main Admin Dashboard ──
export default function AdminDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ background: C.cream, minHeight: "100vh" }}>
      <AdminNavbar user={user} onLogout={onLogout} />
      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div style={{ flex: 1, background: C.cream, overflow: "auto" }}>
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "verification" && <VerificationTab />}
          {activeTab === "transactions" && <TransactionsTab />}
          {activeTab === "moderation" && <ModerationTab />}
        </div>
      </div>
    </div>
  );
}
