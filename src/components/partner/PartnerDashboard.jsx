import { useState, useEffect, useCallback } from "react";
import { productApi, orderApi, userApi } from "../../services/api";

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
const TAGS = ["Makanan Berat", "Bakery", "Minuman", "Snack", "Dessert"];
const fmt = (n) => "Rp " + Number(n).toLocaleString("id-ID");
const disc = (o, s) => Math.round((1 - s / o) * 100);
const relTime = (iso) => {
  const diff = (Date.now() - new Date(iso)) / 1000 / 60;
  if (diff < 60) return `${Math.round(diff)} mnt lalu`;
  if (diff < 1440) return `${Math.round(diff / 60)} jam lalu`;
  return `${Math.round(diff / 1440)} hari lalu`;
};

// ── Shared UI ─────────────────────────────────
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
        padding: "3px 9px",
        borderRadius: 20,
      }}
    >
      {status}
    </span>
  );
}

function StockBadge({ stock }) {
  if (stock === 0)
    return (
      <span
        style={{
          background: C.redLight,
          color: C.red,
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 8px",
          borderRadius: 20,
        }}
      >
        Habis
      </span>
    );
  if (stock <= 3)
    return (
      <span
        style={{
          background: C.amberLight,
          color: C.amber,
          fontSize: 11,
          fontWeight: 600,
          padding: "3px 8px",
          borderRadius: 20,
        }}
      >
        {stock} sisa ⚠
      </span>
    );
  return (
    <span
      style={{
        background: C.greenFaint,
        color: C.greenMid,
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 8px",
        borderRadius: 20,
      }}
    >
      {stock} tersedia
    </span>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        background: type === "ok" ? C.green : C.amber,
        color: "#fff",
        padding: "12px 18px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        maxWidth: 320,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      {message}
    </div>
  );
}

function Spinner() {
  return (
    <div
      style={{
        textAlign: "center",
        padding: 40,
        color: C.textFaint,
        fontSize: 13,
      }}
    >
      Memuat data...
    </div>
  );
}

function ErrBox({ message, onRetry }) {
  return (
    <div
      style={{
        background: C.redLight,
        border: `1px solid ${C.red}`,
        borderRadius: 10,
        padding: "14px 18px",
        fontSize: 13,
        color: C.red,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: "5px 12px",
            borderRadius: 7,
            border: `1px solid ${C.red}`,
            background: "transparent",
            color: C.red,
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}

// ── Page: Dashboard ───────────────────────────
function PageDashboard({ products, orders }) {
  const totalRevenue = orders
    .filter((o) => o.status === "Selesai")
    .reduce((s, o) => s + o.total_price, 0);
  const pending = orders.filter((o) => o.status === "Diproses").length;
  const saved = orders
    .filter((o) => o.status === "Selesai")
    .reduce((s, o) => s + o.quantity, 0);

  const metrics = [
    {
      label: "Produk Aktif",
      value: products.filter((p) => p.stock > 0).length,
      sub: `dari ${products.length} total`,
    },
    {
      label: "Pesanan Pending",
      value: pending,
      sub: "menunggu proses",
      warn: pending > 0,
    },
    {
      label: "Pendapatan Surplus",
      value: fmt(totalRevenue),
      sub: "total terkumpul",
    },
    { label: "Porsi Diselamatkan", value: saved, sub: "dari pemborosan" },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 26,
            fontWeight: 700,
            color: C.text,
            marginBottom: 4,
          }}
        >
          Dashboard Partner
        </h2>
        <p style={{ fontSize: 13, color: C.textMuted }}>
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 24,
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: C.white,
              border: `1px solid ${m.warn ? C.amber : C.border}`,
              borderRadius: 12,
              padding: "16px 18px",
            }}
          >
            <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>
              {m.label}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: m.warn ? C.amber : C.green,
                fontFamily: "'Playfair Display',Georgia,serif",
              }}
            >
              {m.value}
            </div>
            <div style={{ fontSize: 11, color: C.textFaint, marginTop: 4 }}>
              {m.sub}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            Pesanan Terbaru
          </div>
          {orders.length === 0 && (
            <div style={{ fontSize: 13, color: C.textFaint }}>
              Belum ada pesanan.
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {orders.slice(0, 4).map((o) => (
              <div
                key={o.id}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                    {o.customer_name}
                  </div>
                  <div style={{ fontSize: 11, color: C.textMuted }}>
                    {o.quantity}x · {fmt(o.total_price)}
                  </div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "18px 20px",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
            Stok Perlu Perhatian
          </div>
          {products.filter((p) => p.stock <= 3).length === 0 ? (
            <div style={{ fontSize: 13, color: C.textFaint }}>
              Semua stok aman ✓
            </div>
          ) : (
            products
              .filter((p) => p.stock <= 3)
              .map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{p.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{ fontSize: 12, fontWeight: 600, color: C.text }}
                    >
                      {p.name}
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>
                      {fmt(p.surplus_price)}
                    </div>
                  </div>
                  <StockBadge stock={p.stock} />
                </div>
              ))
          )}
        </div>
      </div>

      <div
        style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: "18px 20px",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
          Semua Produk Aktif
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 10,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: C.greenFaint,
                borderRadius: 10,
                padding: "12px 14px",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 6 }}>{p.emoji}</div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: C.text,
                  marginBottom: 2,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: C.greenMid,
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              >
                {fmt(p.surplus_price)}
              </div>
              <StockBadge stock={p.stock} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page: Produk ──────────────────────────────
function PageProducts({ products, setProducts, showToast }) {
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [filterTag, setFilterTag] = useState("Semua");
  const [form, setForm] = useState({
    name: "",
    tag: TAGS[0],
    original_price: "",
    surplus_price: "",
    stock: "",
    emoji: "🍽",
  });

  const resetForm = () => {
    setForm({
      name: "",
      tag: TAGS[0],
      original_price: "",
      surplus_price: "",
      stock: "",
      emoji: "🍽",
    });
    setEditId(null);
  };

  const openEdit = (p) => {
    setForm({
      name: p.name,
      tag: p.tag,
      original_price: p.original_price,
      surplus_price: p.surplus_price,
      stock: p.stock,
      emoji: p.emoji,
    });
    setEditId(p.id);
    setShowForm(true);
  };

  const save = async () => {
    if (!form.name || !form.original_price || !form.surplus_price) {
      showToast("Lengkapi semua field wajib.", "warn");
      return;
    }
    if (+form.surplus_price >= +form.original_price) {
      showToast("Harga surplus harus lebih kecil dari harga asli.", "warn");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        original_price: +form.original_price,
        surplus_price: +form.surplus_price,
        stock: +form.stock,
      };
      if (editId) {
        const updated = await productApi.update(editId, payload);
        setProducts((ps) =>
          ps.map((p) => (p.id === editId ? (updated.data ?? updated) : p)),
        );
        showToast(`"${form.name}" berhasil diperbarui.`, "ok");
      } else {
        const created = await productApi.create(payload);
        setProducts((ps) => [...ps, created.data ?? created]);
        showToast(`"${form.name}" berhasil ditambahkan.`, "ok");
      }
      resetForm();
      setShowForm(false);
    } catch (err) {
      showToast(err.message, "warn");
    } finally {
      setSaving(false);
    }
  };

  const del = async (p) => {
    if (!window.confirm(`Hapus "${p.name}"?`)) return;
    try {
      await productApi.delete(p.id);
      setProducts((ps) => ps.filter((x) => x.id !== p.id));
      showToast(`"${p.name}" dihapus.`, "warn");
    } catch (err) {
      showToast(err.message, "warn");
    }
  };

  const changeStock = async (p, delta) => {
    const newStock = Math.max(0, p.stock + delta);
    try {
      await productApi.updateStock(p.id, newStock);
      setProducts((ps) =>
        ps.map((x) => (x.id === p.id ? { ...x, stock: newStock } : x)),
      );
      if (newStock === 0) showToast(`Stok "${p.name}" habis!`, "warn");
      else if (newStock <= 3)
        showToast(`Stok "${p.name}" tinggal ${newStock}.`, "warn");
    } catch (err) {
      showToast(err.message, "warn");
    }
  };

  const allTags = ["Semua", ...TAGS];
  const filtered =
    filterTag === "Semua"
      ? products
      : products.filter((p) => p.tag === filterTag);
  const f = (key, val) => setForm((s) => ({ ...s, [key]: val }));

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "'Playfair Display',Georgia,serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.text,
            }}
          >
            Stok Makanan Surplus
          </h2>
          <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
            {products.length} produk ·{" "}
            {products.filter((p) => p.stock > 0).length} aktif
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm((s) => !s);
          }}
          style={{
            background: C.green,
            color: "#fff",
            border: "none",
            padding: "9px 18px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {showForm ? "× Tutup" : "+ Tambah Produk"}
        </button>
      </div>

      {showForm && (
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.borderStrong}`,
            borderRadius: 14,
            padding: "20px 22px",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            {editId ? "Edit Produk" : "Produk Surplus Baru"}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {[
              {
                label: "Nama Produk *",
                key: "name",
                type: "text",
                placeholder: "Nasi Kuning Spesial",
              },
              { label: "Emoji", key: "emoji", type: "text", placeholder: "🍱" },
            ].map((fi) => (
              <div key={fi.key}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.textMuted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {fi.label}
                </label>
                <input
                  value={form[fi.key]}
                  onChange={(e) => f(fi.key, e.target.value)}
                  type={fi.type}
                  placeholder={fi.placeholder}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: C.cream,
                    color: C.text,
                    outline: "none",
                  }}
                />
              </div>
            ))}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Kategori
              </label>
              <select
                value={form.tag}
                onChange={(e) => f("tag", e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: `1px solid ${C.border}`,
                  borderRadius: 8,
                  fontSize: 13,
                  background: C.cream,
                  color: C.text,
                }}
              >
                {TAGS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            {[
              { label: "Harga Asli (Rp) *", key: "original_price" },
              { label: "Harga Surplus (Rp) *", key: "surplus_price" },
              { label: "Stok", key: "stock" },
            ].map((fi) => (
              <div key={fi.key}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: C.textMuted,
                    display: "block",
                    marginBottom: 4,
                  }}
                >
                  {fi.label}
                </label>
                <input
                  value={form[fi.key]}
                  onChange={(e) => f(fi.key, e.target.value)}
                  type="number"
                  min="0"
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    border: `1px solid ${C.border}`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: C.cream,
                    color: C.text,
                    outline: "none",
                  }}
                />
              </div>
            ))}
          </div>
          {form.original_price &&
            form.surplus_price &&
            +form.surplus_price < +form.original_price && (
              <div
                style={{
                  fontSize: 12,
                  color: C.greenMid,
                  marginBottom: 12,
                  fontWeight: 500,
                }}
              >
                Diskon {disc(+form.original_price, +form.surplus_price)}% ·
                pembeli hemat {fmt(+form.original_price - +form.surplus_price)}
              </div>
            )}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={() => {
                setShowForm(false);
                resetForm();
              }}
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: "transparent",
                color: C.textMuted,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              Batal
            </button>
            <button
              onClick={save}
              disabled={saving}
              style={{
                padding: "8px 18px",
                borderRadius: 8,
                border: "none",
                background: saving ? C.greenLight : C.green,
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: saving ? "not-allowed" : "pointer",
              }}
            >
              {saving
                ? "Menyimpan..."
                : editId
                  ? "Simpan Perubahan"
                  : "Tambah Produk →"}
            </button>
          </div>
        </div>
      )}

      <div
        style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}
      >
        {allTags.map((t) => (
          <button
            key={t}
            onClick={() => setFilterTag(t)}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: `1px solid ${filterTag === t ? C.green : C.border}`,
              background: filterTag === t ? C.green : "transparent",
              color: filterTag === t ? "#fff" : C.textMuted,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: filterTag === t ? 600 : 400,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((p) => (
          <div
            key={p.id}
            style={{
              background: C.white,
              border: `1px solid ${p.stock === 0 ? C.red : p.stock <= 3 ? C.amber : C.border}`,
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: C.greenFaint,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                flexShrink: 0,
              }}
            >
              {p.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                  {p.name}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    background: C.creamDark,
                    color: C.textMuted,
                    padding: "2px 7px",
                    borderRadius: 10,
                  }}
                >
                  {p.tag}
                </span>
              </div>
              <div style={{ fontSize: 12, color: C.textMuted }}>
                <span style={{ color: C.green, fontWeight: 600 }}>
                  {fmt(p.surplus_price)}
                </span>
                <span style={{ textDecoration: "line-through", marginLeft: 6 }}>
                  {fmt(p.original_price)}
                </span>
                <span
                  style={{
                    marginLeft: 6,
                    background: C.greenFaint,
                    color: C.greenMid,
                    padding: "1px 6px",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: 10,
                  }}
                >
                  -{disc(p.original_price, p.surplus_price)}%
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => changeStock(p, -1)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: C.cream,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                −
              </button>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  minWidth: 24,
                  textAlign: "center",
                  color:
                    p.stock === 0 ? C.red : p.stock <= 3 ? C.amber : C.text,
                }}
              >
                {p.stock}
              </span>
              <button
                onClick={() => changeStock(p, 1)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 6,
                  border: `1px solid ${C.border}`,
                  background: C.cream,
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                +
              </button>
            </div>
            <StockBadge stock={p.stock} />
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => openEdit(p)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 7,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.textMuted,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => del(p)}
                style={{
                  padding: "6px 10px",
                  borderRadius: 7,
                  border: `1px solid ${C.redLight}`,
                  background: "transparent",
                  color: C.red,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              color: C.textFaint,
              fontSize: 13,
            }}
          >
            Belum ada produk di kategori ini.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page: Pesanan ─────────────────────────────
function PageOrders({ orders, setOrders, showToast }) {
  const [filter, setFilter] = useState("Semua");
  const [updating, setUpdating] = useState(null);
  const statuses = ["Semua", "Diproses", "Selesai", "Dibatalkan"];
  const filtered =
    filter === "Semua" ? orders : orders.filter((o) => o.status === filter);

  const updateStatus = async (id, newStatus) => {
    setUpdating(id);
    try {
      await orderApi.updateStatus(id, newStatus);
      setOrders((os) =>
        os.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
      );
      showToast(`Status pesanan #${id} → "${newStatus}"`, "ok");
    } catch (err) {
      showToast(err.message, "warn");
    } finally {
      setUpdating(null);
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status === "Selesai")
    .reduce((s, o) => s + o.total_price, 0);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 22,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Manajemen Pesanan
        </h2>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
          {orders.filter((o) => o.status === "Diproses").length} pending ·{" "}
          {fmt(totalRevenue)} terkumpul
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 12,
          marginBottom: 20,
        }}
      >
        {[
          { label: "Diproses", bg: "#E0EDFF", color: "#1A4A8A" },
          { label: "Selesai", bg: C.greenFaint, color: C.green },
          { label: "Dibatalkan", bg: C.redLight, color: C.red },
        ].map((s) => (
          <div
            key={s.label}
            style={{ background: s.bg, borderRadius: 10, padding: "14px 16px" }}
          >
            <div
              style={{
                fontSize: 12,
                color: s.color,
                fontWeight: 600,
                marginBottom: 4,
              }}
            >
              {s.label}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: s.color,
                fontFamily: "'Playfair Display',Georgia,serif",
              }}
            >
              {orders.filter((o) => o.status === s.label).length}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: "5px 14px",
              borderRadius: 20,
              border: `1px solid ${filter === s ? C.green : C.border}`,
              background: filter === s ? C.green : "transparent",
              color: filter === s ? "#fff" : C.textMuted,
              fontSize: 12,
              cursor: "pointer",
              fontWeight: filter === s ? 600 : 400,
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <div
        style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: "hidden",
        }}
      >
        <table
          style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}
        >
          <thead>
            <tr style={{ background: C.creamDark }}>
              {[
                "#",
                "Produk",
                "Pembeli",
                "Qty",
                "Total",
                "Status",
                "Waktu",
                "Aksi",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "11px 14px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.textMuted,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((o, i) => (
              <tr
                key={o.id}
                style={{
                  borderTop: `1px solid ${C.border}`,
                  background: i % 2 === 0 ? C.white : C.cream,
                }}
              >
                <td
                  style={{
                    padding: "11px 14px",
                    color: C.textFaint,
                    fontWeight: 600,
                  }}
                >
                  #{o.id}
                </td>
                <td style={{ padding: "11px 14px", fontWeight: 500 }}>
                  {o.product?.name ?? "—"}
                </td>
                <td style={{ padding: "11px 14px", color: C.textMuted }}>
                  {o.customer_name}
                </td>
                <td style={{ padding: "11px 14px", fontWeight: 600 }}>
                  {o.quantity}x
                </td>
                <td
                  style={{
                    padding: "11px 14px",
                    color: C.green,
                    fontWeight: 700,
                  }}
                >
                  {fmt(o.total_price)}
                </td>
                <td style={{ padding: "11px 14px" }}>
                  <StatusBadge status={o.status} />
                </td>
                <td
                  style={{
                    padding: "11px 14px",
                    color: C.textFaint,
                    fontSize: 11,
                  }}
                >
                  {o.created_at ? relTime(o.created_at) : "—"}
                </td>
                <td style={{ padding: "11px 14px" }}>
                  {o.status === "Diproses" && (
                    <div style={{ display: "flex", gap: 5 }}>
                      <button
                        onClick={() => updateStatus(o.id, "Selesai")}
                        disabled={updating === o.id}
                        style={{
                          padding: "4px 10px",
                          borderRadius: 6,
                          border: "none",
                          background: C.green,
                          color: "#fff",
                          fontSize: 11,
                          cursor: "pointer",
                          fontWeight: 600,
                          opacity: updating === o.id ? 0.6 : 1,
                        }}
                      >
                        ✓ Selesai
                      </button>
                      <button
                        onClick={() => updateStatus(o.id, "Dibatalkan")}
                        disabled={updating === o.id}
                        style={{
                          padding: "4px 8px",
                          borderRadius: 6,
                          border: `1px solid ${C.redLight}`,
                          background: "transparent",
                          color: C.red,
                          fontSize: 11,
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  {o.status !== "Diproses" && (
                    <span style={{ fontSize: 11, color: C.textFaint }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 32,
              color: C.textFaint,
              fontSize: 13,
            }}
          >
            Tidak ada pesanan.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page: Lokasi ──────────────────────────────
function PageLocation({ user, showToast }) {
  const [lat, setLat] = useState(user?.latitude ?? "");
  const [lng, setLng] = useState(user?.longitude ?? "");
  const [shopName, setShopName] = useState(user?.shop_name ?? "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!lat || !lng) {
      showToast("Masukkan koordinat latitude dan longitude.", "warn");
      return;
    }
    setSaving(true);
    try {
      await userApi.updateLocation({
        shop_name: shopName,
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
      });
      showToast(
        "Koordinat berhasil disimpan. Siap digunakan untuk algoritma VRP.",
        "ok",
      );
    } catch (err) {
      showToast(err.message, "warn");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2
          style={{
            fontFamily: "'Playfair Display',Georgia,serif",
            fontSize: 22,
            fontWeight: 700,
            color: C.text,
          }}
        >
          Lokasi & Profil Toko
        </h2>
        <p style={{ fontSize: 13, color: C.textMuted, marginTop: 2 }}>
          Koordinat ini menjadi node awal dalam algoritma GA-VRP distribusi.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            Informasi Akun
          </div>
          {[
            { label: "Nama", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Role", value: user?.role },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  marginBottom: 4,
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  padding: "9px 12px",
                  background: C.creamDark,
                  borderRadius: 9,
                  fontSize: 13,
                  color: C.textMuted,
                }}
              >
                {f.value ?? "—"}
              </div>
            </div>
          ))}
          <div style={{ marginBottom: 12 }}>
            <label
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.textMuted,
                display: "block",
                marginBottom: 4,
              }}
            >
              Nama Toko
            </label>
            <input
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                border: `1px solid ${C.border}`,
                borderRadius: 9,
                fontSize: 13,
                background: C.cream,
                color: C.text,
                outline: "none",
              }}
            />
          </div>
        </div>

        <div
          style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
            Koordinat Penjemputan
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 16 }}>
            Digunakan sebagai node dalam Vehicle Routing Problem (VRP).
          </div>
          {[
            {
              label: "Latitude",
              val: lat,
              set: setLat,
              placeholder: "-7.9797",
            },
            {
              label: "Longitude",
              val: lng,
              set: setLng,
              placeholder: "112.6304",
            },
          ].map((f) => (
            <div key={f.label} style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: C.textMuted,
                  display: "block",
                  marginBottom: 5,
                }}
              >
                {f.label}
              </label>
              <input
                value={f.val}
                onChange={(e) => f.set(e.target.value)}
                placeholder={f.placeholder}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  border: `1px solid ${C.border}`,
                  borderRadius: 9,
                  fontSize: 13,
                  background: C.cream,
                  color: C.text,
                  outline: "none",
                  fontFamily: "monospace",
                }}
              />
            </div>
          ))}
          {lat && lng && (
            <div
              style={{
                background: C.greenFaint,
                borderRadius: 10,
                padding: "10px 14px",
                marginBottom: 14,
                fontFamily: "monospace",
                fontSize: 12,
                color: C.green,
              }}
            >
              📍 {lat}, {lng}
            </div>
          )}
          <div
            style={{
              fontSize: 11,
              color: C.textFaint,
              padding: "10px 12px",
              background: C.creamDark,
              borderRadius: 9,
              marginBottom: 14,
              fontFamily: "monospace",
            }}
          >
            PATCH /api/user/location
            <br />
            {"{ shop_name, latitude, longitude }"}
          </div>
          <button
            onClick={save}
            disabled={saving}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 9,
              border: "none",
              background: saving ? C.greenLight : C.green,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: saving ? "not-allowed" : "pointer",
            }}
          >
            {saving ? "Menyimpan..." : "Simpan Koordinat →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────
export default function PartnerDashboard({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingData, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const showToast = useCallback(
    (message, type = "ok") => setToast({ message, type }),
    [],
  );

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [prodRes, orderRes] = await Promise.all([
        productApi.list(),
        orderApi.list(),
      ]);
      setProducts(prodRes.data ?? prodRes);
      setOrders(orderRes.data ?? orderRes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const pendingCount = orders.filter((o) => o.status === "Diproses").length;
  const lowStockCount = products.filter((p) => p.stock <= 3).length;

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: "fi-rr-dashboard" },
    {
      key: "products",
      label: "Produk",
      icon: "fi-rr-box-alt",
      badge: lowStockCount || null,
      bColor: C.amber,
    },
    {
      key: "orders",
      label: "Pesanan",
      icon: "fi-rr-list-check",
      badge: pendingCount || null,
      bColor: C.green,
    },
    { key: "location", label: "Lokasi & Profil", icon: "fi-rr-user" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.greenPale}; border-radius: 4px; }
      `}</style>

      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: C.cream,
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: collapsed ? 60 : 220,
            flexShrink: 0,
            background: C.white,
            borderRight: `1px solid ${C.border}`,
            display: "flex",
            flexDirection: "column",
            padding: "20px 0",
            transition: "width 0.2s ease",
          }}
        >
          <div
            style={{
              padding: "0 16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: collapsed ? 32 : 55,
                height: collapsed ? 32 : 55,
                borderRadius: 9,
                background: C.green,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700, 
                fontSize: 15, 
                flexShrink: 0,
                overflow: "hidden",
                transition: "width 0.2s, height 0.2s, border-radius 0.2s",
              }}
            >
              {collapsed ? (
                "R"
              ) : (
                <img
                  src="/REPLATE LOGO.png"
                  alt="Logo"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            {!collapsed && (
              <div>
                <div
                  style={{
                    fontFamily: "'Playfair Display',Georgia,serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.green,
                  }}
                >
                  Re-Plate
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: C.textFaint,
                    letterSpacing: "0.05em",
                  }}
                >
                  PARTNER PORTAL
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: "0 10px", flex: 1 }}>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: collapsed ? "12px" : "9px 12px",
                  borderRadius: 9,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  textAlign: "left",
                  background: page === item.key ? C.greenFaint : "transparent",
                  color: page === item.key ? C.green : C.textMuted,
                  fontWeight: page === item.key ? 700 : 400,
                  overflow: "hidden",
                  marginBottom: 2,
                }}
              >
                <i
                  className={item.icon}
                  style={{
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: collapsed ? 0 : 9,
                    color: page === item.key ? C.green : C.textMuted,
                    minWidth: collapsed ? "auto" : 20,
                  }}
                />
                {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                {/* ... Badge logic tetap sama ... */}
              </button>
            ))}
          </div>

          {!collapsed && (
            <div
              style={{
                padding: "16px 16px 12px",
                borderTop: `1px solid ${C.border}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: C.greenFaint,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.green,
                    flexShrink: 0,
                  }}
                >
                  {(user?.name ?? "?").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: C.text }}>
                    {user?.shop_name ?? user?.name}
                  </div>
                  <div style={{ fontSize: 11, color: C.textFaint }}>
                    {user?.role} · Malang
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                style={{
                  width: "100%",
                  padding: "6px",
                  borderRadius: 7,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.textMuted,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Keluar
              </button>
            </div>
          )}

          <button
            onClick={() => setCollapsed((s) => !s)}
            style={{
              margin: "0 10px",
              padding: "7px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "transparent",
              color: C.textFaint,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            {collapsed ? "→" : "← Collapse"}
          </button>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, overflow: "auto", padding: "28px 32px" }}>
          {loadingData ? (
            <Spinner />
          ) : error ? (
            <ErrBox message={error} onRetry={fetchAll} />
          ) : (
            <>
              {page === "dashboard" && (
                <PageDashboard products={products} orders={orders} />
              )}
              {page === "products" && (
                <PageProducts
                  products={products}
                  setProducts={setProducts}
                  showToast={showToast}
                />
              )}
              {page === "orders" && (
                <PageOrders
                  orders={orders}
                  setOrders={setOrders}
                  showToast={showToast}
                />
              )}
              {page === "location" && (
                <PageLocation user={user} showToast={showToast} />
              )}
            </>
          )}
        </main>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
