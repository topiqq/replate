
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Ambil token dari localStorage (disimpan saat login)
const getToken = () => localStorage.getItem("auth_token");

// Helper fetch dengan auth header
async function apiFetch(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (res.status === 401) {
    // Token expired / invalid → paksa logout
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    window.location.href = "/login";
    return;
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan pada server.");
  }

  return data;
}

// ── Auth ──────────────────────────────────────
export const authApi = {
  login: (email, password) =>
    apiFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    apiFetch("/logout", { method: "POST" }),

  me: () => apiFetch("/user"),
};

// ── Products ──────────────────────────────────
export const productApi = {
  list: () => apiFetch("/products"),

  create: (data) =>
    apiFetch("/products", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateStock: (id, stock) =>
    apiFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify({ stock }),
    }),

  delete: (id) =>
    apiFetch(`/products/${id}`, { method: "DELETE" }),
};

// ── Orders ────────────────────────────────────
export const orderApi = {
  list: () => apiFetch("/orders"),

  updateStatus: (id, status) =>
    apiFetch(`/orders/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

// ── User / Location ───────────────────────────
export const userApi = {
  updateLocation: (data) =>
    apiFetch("/user/location", {
      method: "PATCH",
      body: JSON.stringify(data), // { shop_name, latitude, longitude }
    }),
};
