import { Link } from "react-router-dom";
import { Mountain, ArrowRight, Briefcase, FileCheck, Plane, ShieldCheck, Users, MessageCircleHeart } from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Page d'accueil
// Palette : bleu marine #0B1F3F, or #C9A961, rouge érable #C41E3A, ivoire #F7F5EF
// Signature : le sentier d'ascension (déjà utilisé sur le portail de suivi)
// ---------------------------------------------------------------------------

const ETAPES = [
  { icon: FileCheck, label: "Déposez votre candidature" },
  { icon: Briefcase, label: "Nous trouvons votre employeur" },
  { icon: ShieldCheck, label: "Visa et permis pris en charge" },
  { icon: Plane, label: "Vous vous envolez vers le Canada" },
];

export default function AccueilPage() {
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
          <Link to="/apropos" style={{ color: "#C7D0E0", fontSize: "0.85rem", textDecoration: "none" }}>
            À propos
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

      {/* ---------------- Hero ---------------- */}
      <section
        style={{
          background: "linear-gradient(180deg, #0B1F3F 0%, #12294D 65%, #16305C 100%)",
          padding: "4.5rem 1.5rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 12% 15%, rgba(201,169,97,0.16), transparent 45%)",
          }}
        />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#C9A961",
              border: "1px solid rgba(201,169,97,0.4)",
              borderRadius: 999,
              padding: "0.35rem 0.9rem",
              marginBottom: "1.5rem",
            }}
          >
            Emploi et installation au Canada · accompagnement complet
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 5vw, 3.1rem)",
              lineHeight: 1.15,
              color: "#F7F5EF",
              fontWeight: 700,
              margin: "0 0 1.1rem",
            }}
          >
            Votre ascension vers le Canada
            <br />
            <span style={{ color: "#C9A961" }}>commence par une candidature</span>
          </h1>
          <p
            style={{
              color: "#B9C3D6",
              fontSize: "1.02rem",
              lineHeight: 1.65,
              maxWidth: 520,
              margin: "0 auto 2.25rem",
            }}
          >
            Nous accompagnons des candidats africains, du dossier jusqu'à l'arrivée chez leur employeur au Canada,
            visa, permis de travail et voyage inclus dans le parcours.
          </p>
          <Link
            to="/inscription"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "#C9A961",
              color: "#0B1F3F",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "0.95rem 1.9rem",
              borderRadius: 999,
              textDecoration: "none",
              boxShadow: "0 12px 30px rgba(201,169,97,0.25)",
            }}
          >
            Déposer ma candidature
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Silhouette de montagnes en bas du hero — écho du logo */}
        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 110, marginTop: "3rem" }}
        >
          <polygon points="0,200 0,140 180,40 340,120 520,20 700,110 860,50 1040,130 1200,60 1200,200" fill="#1B3155" />
          <polygon points="0,200 0,170 220,90 400,150 600,70 820,160 1000,90 1200,150 1200,200" fill="#F7F5EF" />
        </svg>
      </section>

      {/* ---------------- Le chemin en 4 étapes ---------------- */}
      <section style={{ padding: "0.5rem 1.5rem 3.5rem", background: "#F7F5EF" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              color: "#0B1F3F",
              textAlign: "center",
              marginBottom: "2.25rem",
            }}
          >
            Le chemin, en quatre temps
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {ETAPES.map((e, i) => {
              const Icon = e.icon;
              return (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EFEAD9",
                    borderRadius: 12,
                    padding: "1.5rem 1.25rem",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: "50%",
                      background: "#0B1F3F",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 0.9rem",
                    }}
                  >
                    <Icon size={20} color="#C9A961" />
                  </div>
                  <div style={{ fontSize: "0.62rem", color: "#C9A961", fontWeight: 700, letterSpacing: "0.08em" }}>
                    ÉTAPE {i + 1}
                  </div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1B2431", marginTop: "0.35rem" }}>
                    {e.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Pourquoi nous ---------------- */}
      <section style={{ background: "#0B1F3F", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 920, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem",
              color: "#F7F5EF",
              textAlign: "center",
              marginBottom: "2.25rem",
            }}
          >
            Un accompagnement, pas juste un dossier
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
            {[
              { icon: Users, title: "Employeurs vérifiés", text: "Nous trouvons un employeur prêt à couvrir vos frais de voyage." },
              { icon: ShieldCheck, title: "Visa & permis inclus", text: "Nous gérons le visa et le permis de travail à votre place." },
              { icon: MessageCircleHeart, title: "Suivi transparent", text: "Vous suivez chaque étape en temps réel, avec un contact direct avec l'équipe." },
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
            fontSize: "1.6rem",
            color: "#0B1F3F",
            marginBottom: "0.75rem",
          }}
        >
          Prêt à commencer votre ascension ?
        </h2>
        <p style={{ color: "#5A6478", marginBottom: "1.75rem" }}>
          Le dépôt de votre candidature prend quelques minutes.
        </p>
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

      {/* ---------------- Footer ---------------- */}
      <footer style={{ background: "#0B1F3F", padding: "1.75rem 1.5rem", textAlign: "center" }}>
        <div style={{ color: "#7C88A6", fontSize: "0.75rem" }}>
          © {new Date().getFullYear()} Summit Canada Group. Construisons votre avenir au Canada.
        </div>
      </footer>
    </div>
  );
}