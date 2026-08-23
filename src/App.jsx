import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Mountain, CheckCircle2, Circle, Clock, MessageCircle, Building2, Send, X, Plane, Loader2, Check, CheckCheck, Download } from "lucide-react";
import CandidatureForm from "./CandidatureForm";

// ---------------------------------------------------------------------------
// Summit Canada Group — Portail Candidat — Version connectée à Supabase
// ---------------------------------------------------------------------------

// Liens de paiement Maketou.
const LIEN_MAKETOU_FRAIS_DOSSIER = "https://new.sebpay.bj/pay/frais-de-dossier-25-URYFue";
const LIEN_MAKETOU_FRAIS_ACCOMPAGNEMENT = "https://new.sebpay.bj/pay/frais-daccompagnement-38-kVGVKz";


function statutStyle(statut) {
  if (statut === "Validé")
    return { bg: "#F4EDD9", border: "#C9A961", text: "#8A6D2F", icon: CheckCircle2, iconColor: "#C9A961" };
  if (statut === "En cours")
    return { bg: "#0B1F3F", border: "#0B1F3F", text: "#F4EDD9", icon: Clock, iconColor: "#C9A961" };
  return { bg: "#FFFFFF", border: "#E4E0D6", text: "#9A968A", icon: Circle, iconColor: "#D8D3C4" };
}

// ---------------------------------------------------------------------------
// Écran de connexion / inscription
// ---------------------------------------------------------------------------
function traduireErreur(message) {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already exists")) return "Un compte existe déjà avec cette adresse email.";
  if (m.includes("invalid login") || m.includes("invalid credentials")) return "Email ou mot de passe incorrect.";
  if (m.includes("password") && m.includes("6")) return "Le mot de passe doit contenir au moins 6 caractères.";
  if (m.includes("invalid email") || m.includes("unable to validate")) return "Adresse email invalide.";
  if (m.includes("rate limit")) return "Trop de tentatives. Merci de patienter quelques instants avant de réessayer.";
  if (m.includes("network") || m.includes("fetch")) return "Problème de connexion. Vérifiez votre connexion internet.";
  return "Une erreur est survenue. Merci de réessayer.";
}

export function AuthScreen() {
  const [mode, setMode] = useState("login"); // "login" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    const fn =
      mode === "login"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({ email, password });
    const { error } = await fn;
    setLoading(false);
    if (error) {
      setError(traduireErreur(error.message));
      return;
    }
    setSuccess(true);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1F3F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Mountain size={30} color="#C9A961" style={{ marginBottom: "0.5rem" }} />
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.3rem",
              letterSpacing: "0.06em",
              color: "#F7F5EF",
              fontWeight: 700,
            }}
          >
            SUMMIT <span style={{ color: "#C9A961" }}>CANADA GROUP</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "#9CA8C4", marginTop: "0.3rem" }}>
            Construisons votre avenir au Canada
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#FFFFFF",
            borderRadius: 14,
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <button
              type="button"
              onClick={() => setMode("login")}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: 8,
                border: "1px solid #E4E0D6",
                background: mode === "login" ? "#0B1F3F" : "#F7F5EF",
                color: mode === "login" ? "#F7F5EF" : "#5A6478",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: 8,
                border: "1px solid #E4E0D6",
                background: mode === "signup" ? "#0B1F3F" : "#F7F5EF",
                color: mode === "signup" ? "#F7F5EF" : "#5A6478",
                fontWeight: 600,
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              Inscription
            </button>
          </div>

          <input
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ border: "1px solid #E4E0D6", borderRadius: 9, padding: "0.7rem 0.9rem", fontSize: "0.9rem", outline: "none" }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ border: "1px solid #E4E0D6", borderRadius: 9, padding: "0.7rem 0.9rem", fontSize: "0.9rem", outline: "none" }}
          />

          {error && <div style={{ color: "#C41E3A", fontSize: "0.8rem" }}>{error}</div>}
          {success && (
            <div style={{ color: "#2F7A4D", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <CheckCircle2 size={14} />
              {mode === "login" ? "Connexion réussie ! Redirection..." : "Inscription réussie ! Redirection vers votre espace..."}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: "#C9A961",
              color: "#0B1F3F",
              border: "none",
              borderRadius: 9,
              padding: "0.75rem",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: loading ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading && <Loader2 size={16} />}
            {mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>

          {mode === "signup" && (
            <div style={{ fontSize: "0.72rem", color: "#8A8579", textAlign: "center" }}>
              Votre dossier sera automatiquement créé après inscription.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page principale — chargement des données réelles du candidat
// ---------------------------------------------------------------------------
export function Dashboard({ session, onLogout }) {
  const [loading, setLoading] = useState(true);
  const [candidat, setCandidat] = useState(null);
  const [candidature, setCandidature] = useState(null);
  const [suivi, setSuivi] = useState([]);
  const [employeur, setEmployeur] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    if (!candidat) return;
    const channel = supabase
      .channel(`messages-candidat-${candidat.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `candidat_id=eq.${candidat.id}` },
        (payload) => {
          setMessages((ms) => (ms.some((m) => m.id === payload.new.id) ? ms : [...ms, payload.new]));
        }
      )
      .subscribe((status) => {
        console.log("Realtime candidat:", status);
      });
    return () => {
      supabase.removeChannel(channel);
    };
  }, [candidat?.id]);

  async function loadAll() {
    setLoading(true);

    const { data: candidatData } = await supabase
      .from("candidats")
      .select("*")
      .eq("auth_id", session.user.id)
      .single();

    if (!candidatData) {
      setLoading(false);
      return;
    }
    setCandidat(candidatData);

    const { data: candidatureData } = await supabase
      .from("candidatures")
      .select("*")
      .eq("candidat_id", candidatData.id)
      .maybeSingle();
    setCandidature(candidatureData);

    const { data: suiviData } = await supabase
      .from("suivi_candidat")
      .select("statut, etape_id, etapes_process(id, nom_etape, ordre)")
      .eq("candidat_id", candidatData.id);

    const merged = (suiviData || [])
      .map((s) => ({
        id: s.etapes_process.id,
        nom: s.etapes_process.nom_etape,
        ordre: s.etapes_process.ordre,
        statut: s.statut,
      }))
      .sort((a, b) => a.ordre - b.ordre);
    setSuivi(merged);

    const { data: employeurData } = await supabase
      .from("employeurs")
      .select("*")
      .eq("candidat_id", candidatData.id)
      .maybeSingle();
    setEmployeur(employeurData);

    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .eq("candidat_id", candidatData.id)
      .order("created_at", { ascending: true });
    setMessages(messagesData || []);

    setLoading(false);
  }

  async function sendMessage() {
    if (!draft.trim() || !candidat) return;
    setSending(true);
    const { data, error } = await supabase
      .from("messages")
      .insert({ candidat_id: candidat.id, expediteur: "candidat", contenu: draft.trim() })
      .select()
      .single();
    setSending(false);
    if (!error && data) {
      setMessages((m) => [...m, data]);
      setDraft("");
    }
  }

  async function markMessagesRead() {
    const unreadIds = messages.filter((m) => m.expediteur === "equipe" && !m.lu).map((m) => m.id);
    if (unreadIds.length === 0) return;
    await supabase.from("messages").update({ lu: true }).in("id", unreadIds);
    setMessages((ms) => ms.map((m) => (unreadIds.includes(m.id) ? { ...m, lu: true } : m)));
  }

  const unreadCount = messages.filter((m) => m.expediteur === "equipe" && !m.lu).length;

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F7F5EF" }}>
        <Loader2 size={28} color="#0B1F3F" />
      </div>
    );
  }

  // Pas encore de candidature soumise : on affiche le formulaire à la place du dashboard.
  if (!candidature) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F7F5EF",
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          padding: "2.5rem 1.5rem",
        }}
      >
        <CandidatureForm candidatId={candidat.id} onSubmitted={loadAll} />
      </div>
    );
  }

  const candidatureEnVerification = suivi.some(
    (s) => s.nom === "Candidature" && s.statut === "En cours"
  );

  const currentIndex = suivi.findIndex((s) => s.statut === "En cours");
  const validatedCount = suivi.filter((s) => s.statut === "Validé").length;
  const progressPct = suivi.length ? Math.round((validatedCount / suivi.length) * 100) : 0;
  const candidatNom = [candidat?.prenom, candidat?.nom].filter(Boolean).join(" ") || candidat?.email;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F5EF",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#1B2431",
        paddingBottom: "4rem",
      }}
    >
      <header
        style={{
          background: "#0B1F3F",
          padding: "1.5rem 1.5rem 2.75rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 85% -10%, rgba(201,169,97,0.25), transparent 55%)",
          }}
        />
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <Mountain size={26} color="#C9A961" strokeWidth={2} />
            <div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.15rem",
                  letterSpacing: "0.06em",
                  color: "#F7F5EF",
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                SUMMIT <span style={{ color: "#C9A961" }}>CANADA GROUP</span>
              </div>
              <div style={{ fontSize: "0.68rem", color: "#9CA8C4", marginTop: "0.2rem" }}>
                Construisons votre avenir au Canada
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1.1rem" }}>
            <Link to="/apropos" style={{ color: "#C7D0E0", fontSize: "0.78rem", textDecoration: "none" }}>
              À propos
            </Link>
            <Link to="/temoignages" style={{ color: "#C7D0E0", fontSize: "0.78rem", textDecoration: "none" }}>
              Témoignages
            </Link>
            <button
              onClick={onLogout}
              style={{
                background: "#16305C",
                border: "1px solid #2A4066",
                color: "#F7F5EF",
                fontSize: "0.75rem",
                padding: "0.4rem 0.8rem",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: "-1.1rem auto 0", padding: "0 1.5rem" }}>
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 14,
            boxShadow: "0 12px 30px rgba(11,31,63,0.12)",
            padding: "1.5rem 1.75rem",
            border: "1px solid #EFEAD9",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <div>
              <div style={{ fontSize: "0.78rem", color: "#8A8579", marginBottom: 2 }}>Bonjour,</div>
              <div
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.35rem",
                  fontWeight: 700,
                  color: "#0B1F3F",
                }}
              >
                {candidatNom}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#C9A961" }}>{progressPct}%</div>
              <div style={{ fontSize: "0.7rem", color: "#8A8579" }}>de l'ascension</div>
            </div>
          </div>
          <div style={{ marginTop: "1rem", height: 8, borderRadius: 999, backgroundColor: "#F0ECDF", overflow: "hidden" }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: "100%",
                background: "linear-gradient(90deg,#C9A961,#E3CD8F)",
                borderRadius: 999,
                transition: "width 0.4s ease",
              }}
            />
          </div>
          {currentIndex >= 0 && (
            <div style={{ marginTop: "0.85rem", fontSize: "0.82rem", color: "#4A5468" }}>
              Prochaine étape : <strong style={{ color: "#0B1F3F" }}>{suivi[currentIndex].nom}</strong>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.25rem 1.5rem 0" }}>
        <div style={{ position: "relative", paddingLeft: "2.75rem" }}>
          <div
            style={{
              position: "absolute",
              left: "1.35rem",
              top: 8,
              bottom: 8,
              width: 2,
              background: `linear-gradient(to bottom, #C9A961 0%, #C9A961 ${progressPct}%, #E4E0D6 ${progressPct}%, #E4E0D6 100%)`,
            }}
          />
          {suivi.map((step, i) => {
            const s = statutStyle(step.statut);
            const Icon = s.icon;
            const isLast = i === suivi.length - 1;
            return (
              <div key={step.id} style={{ position: "relative", marginBottom: isLast ? 0 : "1.1rem" }}>
                <div
                  style={{
                    position: "absolute",
                    left: "-2.75rem",
                    top: "0.15rem",
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: step.statut === "Validé" ? "#C9A961" : "#F7F5EF",
                    border: `2px solid ${
                      step.statut === "Validé" ? "#C9A961" : step.statut === "En cours" ? "#0B1F3F" : "#D8D3C4"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  {isLast ? (
                    <Plane size={13} color={step.statut === "Validé" ? "#0B1F3F" : "#C4BFAF"} />
                  ) : (
                    <Icon size={14} color={step.statut === "Validé" ? "#0B1F3F" : s.iconColor} />
                  )}
                </div>

                <div
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    borderRadius: 10,
                    padding: "0.85rem 1.05rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: step.statut === "En attente" ? 500 : 600,
                      color: step.statut === "En cours" ? "#F7F5EF" : "#1B2431",
                    }}
                  >
                    {step.nom}
                  </span>
                  <span
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      padding: "0.28rem 0.6rem",
                      borderRadius: 999,
                      color: s.text,
                      background:
                        step.statut === "Validé"
                          ? "rgba(255,255,255,0.6)"
                          : step.statut === "En cours"
                          ? "rgba(201,169,97,0.18)"
                          : "#F2EFE6",
                    }}
                  >
                    {step.statut}
                  </span>
                </div>

                {step.nom === "Candidature" && step.statut === "En cours" && (
                  <div
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "0.78rem",
                      color: "#8A6D2F",
                      background: "#F4EDD9",
                      border: "1px solid #E3CD8F",
                      borderRadius: 8,
                      padding: "0.55rem 0.8rem",
                    }}
                  >
                    Votre candidature est en cours de vérification par notre équipe. Une fois validée, nous
                    procéderons à la recherche d'un employeur prêt à couvrir les frais de votre voyage. N'hésitez
                    pas à nous contacter pour toute question ou préoccupation.
                  </div>
                )}

                {step.nom === "Recherche d'Employeur" && step.statut === "Validé" && employeur && (
                  <div
                    style={{
                      marginTop: "0.6rem",
                      background: "#FFFFFF",
                      border: "1px solid #EFEAD9",
                      borderRadius: 10,
                      padding: "0.9rem 1rem",
                      display: "flex",
                      gap: "0.85rem",
                      alignItems: "center",
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
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {employeur.photo_url ? (
                        <img src={employeur.photo_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <Building2 size={20} color="#C9A961" />
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.62rem", color: "#8A8579", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        Votre employeur
                      </div>
                      <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.9rem" }}>
                        {employeur.prenom} {employeur.nom}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#5A6478" }}>{employeur.domaine}</div>
                    </div>
                  </div>
                )}

                {step.nom === "Recherche d'Employeur" && step.statut === "Validé" && employeur?.doc_url && (
                  <a
                    href={employeur.doc_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      background: "#F7F5EF",
                      border: "1px solid #E4E0D6",
                      color: "#0B1F3F",
                      borderRadius: 9,
                      padding: "0.6rem 1rem",
                      fontSize: "0.82rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <Download size={15} />
                    Télécharger la fiche employeur
                  </a>
                )}

                {(step.nom === "Frais de dossier" || step.nom === "Frais d'accompagnement") && step.statut === "En cours" && (
                  <div style={{ marginTop: "0.6rem" }}>
                    <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.85rem", marginBottom: "0.35rem" }}>
                      {step.nom === "Frais de dossier" ? "Frais de dossier · 10 500 FCFA" : "Frais d'accompagnement · 15 500 FCFA"}
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "#5A6478", lineHeight: 1.5, marginBottom: "0.6rem" }}>
                      {step.nom === "Frais de dossier"
                        ? "Ce montant couvre la préparation et l'étude de votre dossier auprès de l'employeur, ainsi que la mise en place de votre contrat de travail, la première étape concrète vers votre nouvel emploi au Canada."
                        : "Ce montant couvre tout l'accompagnement jusqu'à votre arrivée au Canada : contrat, visa, permis de travail et organisation du voyage. Vous n'êtes jamais seul dans ce parcours."}
                    </p>
                    <a
                      href={step.nom === "Frais de dossier" ? LIEN_MAKETOU_FRAIS_DOSSIER : LIEN_MAKETOU_FRAIS_ACCOMPAGNEMENT}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        textAlign: "center",
                        textDecoration: "none",
                        width: "100%",
                        background: "#C9A961",
                        color: "#0B1F3F",
                        border: "none",
                        borderRadius: 9,
                        padding: "0.75rem 1rem",
                        fontWeight: 700,
                        fontSize: "0.88rem",
                      }}
                    >
                      {step.nom === "Frais de dossier" ? "Payer mes frais de dossier" : "Payer mes frais d'accompagnement"}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => {
          setMessagesOpen(true);
          markMessagesRead();
        }}
        style={{
          position: "fixed",
          bottom: "1.5rem",
          right: "1.5rem",
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "#0B1F3F",
          border: "2px solid #C9A961",
          color: "#F7F5EF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 20px rgba(11,31,63,0.35)",
          cursor: "pointer",
        }}
        aria-label="Ouvrir la messagerie"
      >
        <MessageCircle size={22} color="#C9A961" />
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              background: "#C41E3A",
              color: "#FFFFFF",
              borderRadius: "50%",
              minWidth: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              fontWeight: 700,
              border: "2px solid #F7F5EF",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>

      {messagesOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(11,31,63,0.4)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            zIndex: 50,
          }}
          onClick={() => setMessagesOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 480,
              background: "#FFFFFF",
              borderRadius: "18px 18px 0 0",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem 1.25rem",
                borderBottom: "1px solid #EFEAD9",
              }}
            >
              <div style={{ fontWeight: 700, color: "#0B1F3F" }}>Échanges avec l'équipe</div>
              <button onClick={() => setMessagesOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X size={20} color="#8A8579" />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {messages.length === 0 && (
                <div style={{ fontSize: "0.82rem", color: "#8A8579", textAlign: "center", marginTop: "1rem" }}>
                  Aucun message pour l'instant.
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.expediteur === "candidat" ? "flex-end" : "flex-start" }}>
                  <div
                    style={{
                      background: m.expediteur === "candidat" ? "#0B1F3F" : "#F2EFE6",
                      color: m.expediteur === "candidat" ? "#F7F5EF" : "#1B2431",
                      padding: "0.6rem 0.85rem",
                      borderRadius: 12,
                      maxWidth: "80%",
                      fontSize: "0.85rem",
                    }}
                  >
                    {m.contenu}
                  </div>
                  {m.expediteur === "candidat" && (
                    <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.2rem" }}>
                      {m.lu ? <CheckCheck size={13} color="#C9A961" /> : <Check size={13} color="#B7BEC9" />}
                      <span style={{ fontSize: "0.65rem", color: "#8A8579" }}>{m.lu ? "Vu" : "Envoyé"}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.5rem", padding: "0.85rem 1.25rem", borderTop: "1px solid #EFEAD9" }}>
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Écrire un message..."
                style={{ flex: 1, border: "1px solid #E4E0D6", borderRadius: 9, padding: "0.6rem 0.85rem", fontSize: "0.85rem", outline: "none" }}
              />
              <button
                onClick={sendMessage}
                disabled={sending}
                style={{
                  background: "#C9A961",
                  border: "none",
                  borderRadius: 9,
                  width: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: sending ? "default" : "pointer",
                  opacity: sending ? 0.6 : 1,
                }}
              >
                <Send size={17} color="#0B1F3F" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant racine — gère l'état de session
// ---------------------------------------------------------------------------
export default function App() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B1F3F" }}>
        <Loader2 size={28} color="#C9A961" />
      </div>
    );
  }

  if (!session) {
    return <AuthScreen />;
  }

  return <Dashboard session={session} onLogout={() => supabase.auth.signOut()} />;
}