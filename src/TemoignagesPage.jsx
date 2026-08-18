import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Mountain, ArrowRight, MessageCircle, Loader2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Page Témoignages
// Connectée à Supabase (table "temoignages", alimentée depuis le dashboard admin).
// ---------------------------------------------------------------------------

function TemoignageCard({ t }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #EFEAD9",
        borderRadius: 14,
        overflow: "hidden",
      }}
    >
      {/* Zone capture WhatsApp */}
      <div
        style={{
          background: "#E9EDE4",
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {t.capture_url ? (
          <img src={t.capture_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "#8A9282" }}>
            <MessageCircle size={26} />
            <span style={{ fontSize: "0.72rem" }}>Capture WhatsApp à venir</span>
          </div>
        )}
      </div>

      {/* Identité */}
      <div style={{ padding: "1rem 1.1rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#0B1F3F",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {t.photo_url ? (
            <img src={t.photo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ color: "#C9A961", fontWeight: 700, fontSize: "0.95rem" }}>{t.prenom[0]}</span>
          )}
        </div>
        <div>
          <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.92rem" }}>
            {t.prenom}, {t.ville}
          </div>
          <div style={{ fontSize: "0.78rem", color: "#5A6478" }}>{t.poste}</div>
        </div>
      </div>
    </div>
  );
}

export default function TemoignagesPage({ isLoggedIn = false }) {
  const [temoignages, setTemoignages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("temoignages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setTemoignages(data || []);
        setLoading(false);
      });
  }, []);
  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#1B2431",
        background: "#F7F5EF",
      }}
    >
      {/* ---------------- Nav ---------------- */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "#0B1F3F",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Mountain size={22} color="#C9A961" strokeWidth={2} />
          <span
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem",
              letterSpacing: "0.05em",
              color: "#F7F5EF",
              fontWeight: 700,
            }}
          >
            SUMMIT <span style={{ color: "#C9A961" }}>CANADA GROUP</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {isLoggedIn ? (
            <Link to="/" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
              Mon suivi
            </Link>
          ) : (
            <>
              <Link to="/" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
                Accueil
              </Link>
              <Link to="/apropos" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
                À propos
              </Link>
              <Link
                to="/inscription"
                style={{
                  background: "transparent",
                  border: "1px solid #C9A961",
                  color: "#C9A961",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  padding: "0.45rem 0.95rem",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Connexion
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* ---------------- En-tête ---------------- */}
      <section
        style={{
          background: "linear-gradient(180deg, #0B1F3F 0%, #16305C 100%)",
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#C9A961",
            marginBottom: "1rem",
          }}
        >
          Ils sont arrivés au Canada
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4.5vw, 2.4rem)",
            color: "#F7F5EF",
            fontWeight: 700,
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.25,
          }}
        >
          Leur parcours, dans leurs propres mots
        </h1>
      </section>

      {/* ---------------- Grille de témoignages ---------------- */}
      <section style={{ padding: "3rem 1.5rem" }}>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <Loader2 size={26} color="#0B1F3F" />
          </div>
        ) : temoignages.length === 0 ? (
          <div style={{ textAlign: "center", color: "#8A8579", fontSize: "0.9rem" }}>
            Les premiers témoignages arrivent bientôt.
          </div>
        ) : (
          <div
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {temoignages.map((t) => (
              <TemoignageCard key={t.id} t={t} />
            ))}
          </div>
        )}
      </section>

      {/* ---------------- CTA final (visiteurs non connectés uniquement) ---------------- */}
      {!isLoggedIn && (
        <section style={{ padding: "2rem 1.5rem 4rem", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem",
              color: "#0B1F3F",
              marginBottom: "1.25rem",
            }}
          >
            Le prochain témoignage pourrait être le vôtre
          </h2>
          <Link
            to="/inscription"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#C9A961",
              color: "#0B1F3F",
              fontWeight: 700,
              fontSize: "0.95rem",
              padding: "0.9rem 1.8rem",
              borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Déposer ma candidature
            <ArrowRight size={17} />
          </Link>
        </section>
      )}

      {/* ---------------- Footer ---------------- */}
      <footer style={{ background: "#0B1F3F", padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <div style={{ color: "#7C88A6", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Summit Canada Group. Construisons votre avenir au Canada.
        </div>
      </footer>
    </div>
  );
}