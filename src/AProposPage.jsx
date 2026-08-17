import { Link } from "react-router-dom";
import { Mountain, Compass, HeartHandshake, ShieldCheck, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Page À propos
// Continuité de palette et du motif d'ascension
// ---------------------------------------------------------------------------

export default function AProposPage() {
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
          <Link to="/" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
            Accueil
          </Link>
          <Link to="/temoignages" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
            Témoignages
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
        </div>
      </nav>

      {/* ---------------- En-tête ---------------- */}
      <section
        style={{
          background: "linear-gradient(180deg, #0B1F3F 0%, #16305C 100%)",
          padding: "4rem 1.5rem 3.5rem",
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
          5 ans d'expérience · Notre mission
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4.5vw, 2.6rem)",
            color: "#F7F5EF",
            fontWeight: 700,
            maxWidth: 640,
            margin: "0 auto",
            lineHeight: 1.25,
          }}
        >
          Chaque sommet se gravit mieux <span style={{ color: "#C9A961" }}>accompagné</span>
        </h1>
      </section>

      {/* ---------------- Le constat ---------------- */}
      <section style={{ padding: "3.25rem 1.5rem" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#3A4356" }}>
            Trouver un emploi au Canada, comprendre les démarches de visa, réunir les bons documents, organiser un
            départ : chacune de ces étapes est franchissable seule. Mais mises bout à bout, sans accompagnement,
            elles deviennent un parcours long, coûteux en énergie, et souvent semé d'incertitudes.
          </p>
          <p style={{ fontSize: "1rem", lineHeight: 1.75, color: "#3A4356", marginTop: "1.1rem" }}>
            Depuis 5 ans, Summit Canada Group transforme ce parcours en un chemin balisé : un employeur identifié pour
            vous, un dossier suivi pas à pas, un visa et un permis de travail pris en charge, jusqu'à votre arrivée.
          </p>
        </div>
      </section>

      {/* ---------------- Nos engagements ---------------- */}
      <section style={{ background: "#0B1F3F", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.4rem",
              color: "#F7F5EF",
              textAlign: "center",
              marginBottom: "2.25rem",
            }}
          >
            Ce que vous pouvez attendre de nous
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
            {[
              {
                icon: Compass,
                title: "Un chemin clair",
                text: "Chaque étape de votre dossier est visible, du premier jour jusqu'à votre arrivée.",
              },
              {
                icon: ShieldCheck,
                title: "Une prise en charge réelle",
                text: "Visa et permis de travail sont gérés par notre équipe, pas laissés à votre charge.",
              },
              {
                icon: HeartHandshake,
                title: "Un contact humain",
                text: "Une équipe joignable tout au long du processus, pas seulement au moment de payer.",
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div key={i} style={{ padding: "1.25rem 0" }}>
                  <Icon size={22} color="#C9A961" style={{ marginBottom: "0.75rem" }} />
                  <div style={{ color: "#F7F5EF", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" }}>
                    {c.title}
                  </div>
                  <div style={{ color: "#9CA8C4", fontSize: "0.85rem", lineHeight: 1.55 }}>{c.text}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- CTA final ---------------- */}
      <section style={{ padding: "3.5rem 1.5rem", textAlign: "center" }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.5rem",
            color: "#0B1F3F",
            marginBottom: "0.75rem",
          }}
        >
          Votre dossier commence par une candidature
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
            marginTop: "0.75rem",
          }}
        >
          Déposer ma candidature
          <ArrowRight size={17} />
        </Link>
      </section>

      {/* ---------------- Footer ---------------- */}
      <footer style={{ background: "#0B1F3F", padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <div style={{ color: "#7C88A6", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Summit Canada Group. Construisons votre avenir au Canada.
        </div>
      </footer>
    </div>
  );
}