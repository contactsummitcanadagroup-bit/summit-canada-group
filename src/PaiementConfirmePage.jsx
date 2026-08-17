import { Link } from "react-router-dom";
import { Mountain, CheckCircle2, ArrowRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Confirmation de paiement
// URL de redirection à configurer côté Maketou pour les 2 liens de paiement.
// ---------------------------------------------------------------------------

export default function PaiementConfirmePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0B1F3F 0%, #16305C 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "2.25rem 1.75rem",
          maxWidth: 420,
          width: "100%",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "#F4EDD9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}
        >
          <CheckCircle2 size={30} color="#C9A961" />
        </div>

        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#0B1F3F",
            marginBottom: "0.75rem",
          }}
        >
          Merci, votre paiement a bien été reçu
        </div>

        <p style={{ fontSize: "0.9rem", color: "#5A6478", lineHeight: 1.65, marginBottom: "1.75rem" }}>
          Notre équipe vérifie et valide cette étape sous peu. Vous pouvez suivre l'avancement de votre dossier à
          tout moment depuis votre espace.
        </p>

        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.55rem",
            background: "#0B1F3F",
            color: "#F7F5EF",
            fontWeight: 700,
            fontSize: "0.9rem",
            padding: "0.8rem 1.6rem",
            borderRadius: 999,
            textDecoration: "none",
          }}
        >
          Retour à mon suivi
          <ArrowRight size={16} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "1.5rem" }}>
          <Mountain size={14} color="#C9A961" />
          <span style={{ fontSize: "0.7rem", color: "#8A8579" }}>Summit Canada Group</span>
        </div>
      </div>
    </div>
  );
}