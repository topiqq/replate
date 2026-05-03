import { useState } from "react";

const C = {
  cream: "#F5F0E8",
  green: "#2D5016",
  greenLight: "#6B9E3A",
  greenFaint: "#EAF2D8",
  text: "#1A1A0F",
  textMuted: "#6B6B52",
  border: "rgba(45,80,22,0.15)",
  white: "#fff",
};

export default function LandingPage({ onGetStarted }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: C.cream }}>
      {/* ─── NAVBAR ─── */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          borderBottom: `1px solid ${C.border}`,
          background: C.white,
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: C.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/REPLATE LOGO.png"
              alt="Re-Plate"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              color: C.green,
            }}
          >
            Re-Plate
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          <a
            href="#features"
            style={{
              fontSize: 14,
              color: C.textMuted,
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = C.green)}
            onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
          >
            Fitur
          </a>
          <a
            href="#about"
            style={{
              fontSize: 14,
              color: C.textMuted,
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = C.green)}
            onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
          >
            Tentang
          </a>
          <a
            href="#contact"
            style={{
              fontSize: 14,
              color: C.textMuted,
              textDecoration: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = C.green)}
            onMouseLeave={(e) => (e.target.style.color = C.textMuted)}
          >
            Kontak
          </a>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: `1px solid ${C.green}`,
                background: C.white,
                color: C.green,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = C.greenFaint;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = C.white;
              }}
            >
              Masuk
            </button>
            <button
              onClick={onGetStarted}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "none",
                background: C.green,
                color: C.white,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = C.greenLight;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = C.green;
              }}
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section
        style={{
          minHeight: "calc(100vh - 73px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 32px",
          textAlign: "center",
          background: `linear-gradient(135deg, ${C.cream} 0%, ${C.greenFaint} 100%)`,
        }}
      >
        <div style={{ maxWidth: 800 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 56,
              fontWeight: 700,
              color: C.green,
              marginBottom: 20,
              lineHeight: 1.2,
            }}
          >
            Marketplace Makanan Berkelanjutan
          </h1>
          <p
            style={{
              fontSize: 18,
              color: C.textMuted,
              marginBottom: 40,
              lineHeight: 1.6,
            }}
          >
            Terhubung dengan restoran dan kafe terbaik yang berkomitmen mengurangi limbah makanan. Nikmati hidangan lezat sambil berkontribusi untuk planet yang lebih sehat.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
            <button
              onClick={onGetStarted}
              style={{
                padding: "14px 32px",
                borderRadius: 9,
                border: "none",
                background: C.green,
                color: C.white,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = C.greenLight;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = C.green;
                e.target.style.transform = "translateY(0)";
              }}
            >
              Mulai Sekarang →
            </button>
            <button
              style={{
                padding: "14px 32px",
                borderRadius: 9,
                border: `2px solid ${C.green}`,
                background: "transparent",
                color: C.green,
                fontSize: 16,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = C.greenFaint;
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section
        id="features"
        style={{
          padding: "80px 32px",
          background: C.white,
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 40,
              fontWeight: 700,
              color: C.green,
              textAlign: "center",
              marginBottom: 60,
            }}
          >
            Fitur Unggulan
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 32,
            }}
          >
            {[
              {
                title: "Jelajahi Restoran",
                desc: "Temukan ribuan restoran dan kafe yang berkomitmen pada keberlanjutan.",
                icon: "🍽️",
              },
              {
                title: "Penawaran Eksklusif",
                desc: "Dapatkan diskon spesial untuk makanan premium dengan harga terjangkau.",
                icon: "🎁",
              },
              {
                title: "Rating & Review",
                desc: "Baca ulasan jujur dari komunitas pengguna Re-Plate.",
                icon: "⭐",
              },
              {
                title: "Pesan Mudah",
                desc: "Pesan makanan favorit dengan beberapa klik saja.",
                icon: "📱",
              },
              {
                title: "Dukungan 24/7",
                desc: "Tim support kami siap membantu kapan saja.",
                icon: "💬",
              },
              {
                title: "Dampak Nyata",
                desc: "Lihat kontribusi Anda dalam mengurangi limbah makanan.",
                icon: "🌍",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  padding: 32,
                  background: C.cream,
                  borderRadius: 12,
                  border: `1px solid ${C.border}`,
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 24px rgba(45, 80, 22, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.green,
                    marginBottom: 12,
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.6 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS SECTION ─── */}
      <section
        style={{
          padding: "80px 32px",
          background: C.green,
          color: C.white,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 40,
              textAlign: "center",
            }}
          >
            {[
              { number: "500+", label: "Restoran Mitra" },
              { number: "50K+", label: "Pengguna Aktif" },
              { number: "100K+", label: "Makanan Terjual" },
              { number: "2K+", label: "Ton Limbah Dikurangi" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  {stat.number}
                </div>
                <div style={{ fontSize: 16, opacity: 0.9 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section
        style={{
          padding: "80px 32px",
          background: C.cream,
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 40,
              fontWeight: 700,
              color: C.green,
              marginBottom: 20,
            }}
          >
            Siap Bergabung?
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.textMuted,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Jadilah bagian dari gerakan keberlanjutan. Daftar hari ini dan mulai menikmati makanan lezat sambil menyelamatkan planet.
          </p>
          <button
            onClick={onGetStarted}
            style={{
              padding: "14px 40px",
              borderRadius: 9,
              border: "none",
              background: C.green,
              color: C.white,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = C.greenLight;
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = C.green;
              e.target.style.transform = "translateY(0)";
            }}
          >
            Daftar Sekarang
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          padding: "40px 32px",
          background: C.green,
          color: C.white,
          textAlign: "center",
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 40,
              marginBottom: 40,
              textAlign: "left",
            }}
          >
            <div>
              <h4 style={{ marginBottom: 16, fontWeight: 700 }}>Produk</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Fitur", "Harga", "Keamanan"].map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <a
                      href="#"
                      style={{
                        color: C.white,
                        textDecoration: "none",
                        opacity: 0.8,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = 1)}
                      onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, fontWeight: 700 }}>Perusahaan</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Tentang", "Blog", "Karir"].map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <a
                      href="#"
                      style={{
                        color: C.white,
                        textDecoration: "none",
                        opacity: 0.8,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = 1)}
                      onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: 16, fontWeight: 700 }}>Legal</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Privacy", "Terms", "Support"].map((item) => (
                  <li key={item} style={{ marginBottom: 8 }}>
                    <a
                      href="#"
                      style={{
                        color: C.white,
                        textDecoration: "none",
                        opacity: 0.8,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = 1)}
                      onMouseLeave={(e) => (e.target.style.opacity = 0.8)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              paddingTop: 20,
              borderTop: "1px solid rgba(255,255,255,0.2)",
              fontSize: 14,
              opacity: 0.8,
            }}
          >
            © 2024 Re-Plate. Semua hak dilindungi. Bersama menjaga planet lebih hijau.
          </div>
        </div>
      </footer>
    </div>
  );
}
