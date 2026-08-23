import { Link } from "react-router-dom";
import {
  Mountain,
  ArrowRight,
  Plane,
  FileCheck,
  Users2,
  ShieldCheck,
  Home,
  Briefcase,
  FileText,
  Eye,
  HeartHandshake,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Page d'accueil
// Copywriting orienté bénéfices/objections, dans l'identité de marque existante.
// ---------------------------------------------------------------------------

const ETAPES = [
  {
    n: "01",
    icon: FileCheck,
    titre: "Vous déposez votre candidature",
    texte: "Vous remplissez le formulaire. Notre équipe analyse votre profil et vous recontacte.",
  },
  {
    n: "02",
    icon: Users2,
    titre: "On vous trouve l'employeur",
    texte: "On identifie un employeur canadien prêt à financer votre voyage et adapté à votre profil.",
  },
  {
    n: "03",
    icon: FileText,
    titre: "On prépare votre dossier",
    texte: "Visa, permis de travail, contrat signé, billets, tout est géré avec vous, pas à votre place.",
  },
  {
    n: "04",
    icon: Plane,
    titre: "Vous partez au Canada",
    texte: "Billet payé, employeur qui vous attend. Vous arrivez, vous commencez.",
  },
];

const BENEFICES = [
  { icon: Plane, titre: "Voyage financé", texte: "Votre employeur couvre l'intégralité du billet. Vous n'avancez rien." },
  { icon: Home, titre: "Logement facilité", texte: "Selon l'employeur, un logement est prévu dès votre arrivée." },
  { icon: Briefcase, titre: "Contrat signé avant le départ", texte: "Vous partez avec un contrat en main. Votre employeur vous a choisi." },
  { icon: FileText, titre: "Dossier complet préparé", texte: "Visa, permis, documents officiels, préparés avec vous, étape par étape." },
  { icon: ShieldCheck, titre: "Processus transparent", texte: "Chaque étape est visible depuis votre espace. Zéro zone d'ombre." },
  { icon: HeartHandshake, titre: "Accompagnement complet", texte: "Notre équipe reste disponible avant, pendant et après votre départ." },
];

const CRITERES = [
  "Vous voulez partir au Canada mais l'argent du voyage vous bloque",
  "Vous avez une expérience professionnelle dans un domaine concret",
  "Vous avez peur d'être arnaqué par une fausse agence",
  "Vous voulez un processus transparent avec un suivi sérieux",
  "Vous parlez français ou anglais, même à un niveau de base",
  "Vous êtes prêt(e) à vous investir jusqu'au bout du processus",
];

const FAQ = [
  {
    q: "Est-ce qu'il y a des frais cachés ?",
    r: "Vous ne payez rien tant que nous n'avons pas trouvé un employeur prêt à couvrir vos frais de voyage. Une fois l'employeur trouvé, le coût total est de 26 000 FCFA, réparti entre les frais de dossier et l'accompagnement, communiqué avant toute démarche. Le billet d'avion est pris en charge par votre employeur, le logement selon les employeurs.",
  },
  {
    q: "Comment je sais que ce n'est pas une arnaque ?",
    r: "Contrairement à une fausse agence, on ne vous demande jamais une grosse somme d'un coup. Vous suivez chaque étape de votre dossier en temps réel depuis votre espace personnel.",
  },
  {
    q: "Et si je n'ai pas de diplôme universitaire ?",
    r: "Pas de problème. Le Canada recrute dans des secteurs sans diplôme : construction, transport, agriculture, restauration. Ce qui compte, c'est votre expérience.",
  },
  {
    q: "Est-ce que je dois parler anglais ?",
    r: "Pas forcément. Si vous parlez français, le Québec est une excellente destination. Pour les provinces anglophones, un niveau de base suffit selon le poste.",
  },
  {
    q: "Combien de temps prend le processus ?",
    r: "En moyenne 3 à 6 mois selon votre profil et votre dossier.",
  },
];

function FaqItem({ q, r }) {
  return (
    <details
      style={{
        background: "#FFFFFF",
        border: "1px solid #EFEAD9",
        borderRadius: 10,
        padding: "0.95rem 1.1rem",
      }}
    >
      <summary style={{ cursor: "pointer", fontWeight: 700, color: "#0B1F3F", fontSize: "0.92rem", listStyle: "none" }}>
        {q}
      </summary>
      <p style={{ marginTop: "0.6rem", fontSize: "0.85rem", color: "#5A6478", lineHeight: 1.6 }}>{r}</p>
    </details>
  );
}

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
            Candidatures ouvertes · Programme 2026
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
            Votre employeur canadien
            <br />
            <span style={{ color: "#C9A961" }}>paie votre voyage.</span>
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
            Vous ne payez rien tant que nous n'avons pas trouvé l'employeur qui financera votre billet d'avion. On
            vous accompagne de A à Z, du formulaire jusqu'à votre arrivée.
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

        <svg
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: 110, marginTop: "3rem" }}
        >
          <polygon points="0,200 0,140 180,40 340,120 520,20 700,110 860,50 1040,130 1200,60 1200,200" fill="#1B3155" />
          <polygon points="0,200 0,170 220,90 400,150 600,70 820,160 1000,90 1200,150 1200,200" fill="#F7F5EF" />
        </svg>
      </section>

      {/* ---------------- Comment ça marche ---------------- */}
      <section style={{ padding: "0.5rem 1.5rem 3.5rem", background: "#F7F5EF" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.5rem" }}>
              Comment ça marche
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", color: "#0B1F3F" }}>
              Quatre étapes pour partir travailler au Canada
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {ETAPES.map((e) => {
              const Icon = e.icon;
              return (
                <div
                  key={e.n}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EFEAD9",
                    borderRadius: 12,
                    padding: "1.5rem 1.25rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.9rem" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#0B1F3F",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} color="#C9A961" />
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "#C9A961", fontWeight: 700, letterSpacing: "0.06em" }}>
                      ÉTAPE {e.n}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#1B2431", marginBottom: "0.4rem" }}>{e.titre}</div>
                  <div style={{ fontSize: "0.82rem", color: "#5A6478", lineHeight: 1.55 }}>{e.texte}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Ce que vous obtenez ---------------- */}
      <section style={{ background: "#0B1F3F", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.5rem" }}>
              Ce que vous obtenez
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", color: "#F7F5EF" }}>
              Tout ce dont vous avez besoin pour réussir
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.25rem" }}>
            {BENEFICES.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} style={{ padding: "1.1rem 0" }}>
                  <Icon size={22} color="#C9A961" style={{ marginBottom: "0.75rem" }} />
                  <div style={{ color: "#F7F5EF", fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.4rem" }}>{b.titre}</div>
                  <div style={{ color: "#9CA8C4", fontSize: "0.82rem", lineHeight: 1.55 }}>{b.texte}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Ce que vous payez ---------------- */}
      <section style={{ padding: "3.5rem 1.5rem" }}>
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            background: "#0B1F3F",
            border: "1px solid rgba(201,169,97,0.25)",
            borderRadius: 16,
            padding: "2rem 1.75rem",
          }}
        >
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.75rem", textAlign: "center" }}>
            Ce que vous payez, en toute transparence
          </div>
          <p
            style={{
              color: "#0B1F3F",
              background: "#C9A961",
              borderRadius: 10,
              padding: "0.85rem 1rem",
              fontSize: "0.86rem",
              fontWeight: 700,
              lineHeight: 1.5,
              textAlign: "center",
              marginBottom: "1.3rem",
            }}
          >
            Vous ne payez rien tant que nous n'avons pas trouvé un employeur prêt à couvrir votre voyage.
          </p>
          <p style={{ color: "#E4E9F2", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: "1.1rem", textAlign: "center" }}>
            Une fois l'employeur trouvé, le billet d'avion est intégralement financé par lui. Deux frais interviennent
            alors pour finaliser votre dossier :
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", marginBottom: "1.1rem" }}>
            <div style={{ fontSize: "0.86rem", color: "#C7D0E0", lineHeight: 1.55 }}>
              💼 <strong style={{ color: "#F7F5EF" }}>Frais de dossier · 10 500 FCFA</strong> — couvre la
              préparation et l'étude de votre dossier auprès de l'employeur, jusqu'à l'obtention de votre contrat de
              travail.
            </div>
            <div style={{ fontSize: "0.86rem", color: "#C7D0E0", lineHeight: 1.55 }}>
              🛂 <strong style={{ color: "#F7F5EF" }}>Frais d'accompagnement · 15 500 FCFA</strong> — couvre le
              reste du parcours : visa, permis de travail et organisation du voyage.
            </div>
          </div>
          <p style={{ color: "#9CA8C4", fontSize: "0.82rem", margin: 0, textAlign: "center" }}>
            Soit 26 000 FCFA au total, jamais avant qu'un employeur ne soit confirmé pour vous.
          </p>
        </div>
      </section>

      {/* ---------------- Pour qui ---------------- */}
      <section style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.5rem" }}>
              Pour qui
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", color: "#0B1F3F" }}>
              Ce programme est fait pour vous si...
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.9rem" }}>
            {CRITERES.map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#F4EDD9",
                    color: "#8A6D2F",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "0.1rem",
                  }}
                >
                  ✓
                </div>
                <span style={{ fontSize: "0.88rem", color: "#3A4356", lineHeight: 1.5 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Témoignages teaser ---------------- */}
      <section style={{ background: "#F0ECDF", padding: "3rem 1.5rem", textAlign: "center" }}>
        <Eye size={24} color="#0B1F3F" style={{ marginBottom: "0.9rem" }} />
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.35rem", color: "#0B1F3F", marginBottom: "0.75rem" }}>
          Ils avaient les mêmes doutes que vous
        </h2>
        <p style={{ fontSize: "0.88rem", color: "#5A6478", marginBottom: "1.5rem", maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
          Des candidats accompagnés jusqu'à leur arrivée au Canada racontent leur parcours.
        </p>
        <Link
          to="/temoignages"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#0B1F3F",
            fontWeight: 700,
            fontSize: "0.88rem",
            textDecoration: "none",
            borderBottom: "2px solid #C9A961",
            paddingBottom: "0.2rem",
          }}
        >
          Voir leurs témoignages
          <ArrowRight size={15} />
        </Link>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section style={{ padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A961", marginBottom: "0.5rem" }}>
              Questions fréquentes
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.6rem", color: "#0B1F3F" }}>
              On répond à ce que vous vous demandez
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {FAQ.map((f, i) => (
              <FaqItem key={i} q={f.q} r={f.r} />
            ))}
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
          Commencez votre voyage au Canada aujourd'hui
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