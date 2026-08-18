import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { Mountain, Loader2, CheckCircle2, LogOut, Users, Building2, Upload, MessageCircle, Send, Star, Check, CheckCheck } from "lucide-react";

const ADMIN_EMAIL = "contact.summitcanadagroup@gmail.com";

// ---------------------------------------------------------------------------
// Summit Canada Group — Dashboard admin
// Route séparée du reste de l'app (ex : /admin). Accès réservé à ADMIN_EMAIL.
// ---------------------------------------------------------------------------

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
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
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <Mountain size={28} color="#C9A961" style={{ marginBottom: "0.5rem" }} />
          <div
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
              color: "#F7F5EF",
              fontWeight: 700,
            }}
          >
            ADMIN <span style={{ color: "#C9A961" }}>SUMMIT</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{ background: "#FFFFFF", borderRadius: 14, padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}
        >
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
            style={{ border: "1px solid #E4E0D6", borderRadius: 9, padding: "0.7rem 0.9rem", fontSize: "0.9rem", outline: "none" }}
          />
          {error && <div style={{ color: "#C41E3A", fontSize: "0.8rem" }}>{error}</div>}
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
            }}
          >
            {loading && <Loader2 size={16} />}
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

function AccesRefuse({ onLogout }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        background: "#F7F5EF",
        fontFamily: "'Inter', sans-serif",
        padding: "1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ color: "#0B1F3F", fontWeight: 700 }}>Accès réservé à l'équipe Summit Canada Group.</div>
      <button
        onClick={onLogout}
        style={{ background: "#0B1F3F", color: "#F7F5EF", border: "none", borderRadius: 9, padding: "0.6rem 1.2rem", cursor: "pointer" }}
      >
        Se déconnecter
      </button>
    </div>
  );
}

function EmployeurForm({ candidatId, onSaved, onCancel }) {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [domaine, setDomaine] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    let photo_url = null;
    if (photoFile) {
      const filePath = `employeurs/${candidatId}-${Date.now()}-${photoFile.name}`;
      const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, photoFile);
      if (uploadError) {
        setError("Erreur lors de l'upload de la photo.");
        setSaving(false);
        return;
      }
      const { data: publicUrlData } = supabase.storage.from("photos").getPublicUrl(filePath);
      photo_url = publicUrlData.publicUrl;
    }

    const { error: insertError } = await supabase
      .from("employeurs")
      .insert({ candidat_id: candidatId, nom, prenom, domaine, photo_url });

    setSaving(false);
    if (insertError) {
      setError("Erreur lors de l'enregistrement.");
      return;
    }
    onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "0.75rem",
        padding: "1rem",
        background: "#F7F5EF",
        borderRadius: 10,
        border: "1px solid #EFEAD9",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        width: "100%",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
        <input
          placeholder="Prénom de l'employeur"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
          style={{ border: "1px solid #E4E0D6", borderRadius: 8, padding: "0.55rem 0.75rem", fontSize: "0.85rem" }}
        />
        <input
          placeholder="Nom de l'employeur"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={{ border: "1px solid #E4E0D6", borderRadius: 8, padding: "0.55rem 0.75rem", fontSize: "0.85rem" }}
        />
      </div>
      <input
        placeholder="Domaine (ex : Logistique & Entreposage)"
        value={domaine}
        onChange={(e) => setDomaine(e.target.value)}
        required
        style={{ border: "1px solid #E4E0D6", borderRadius: 8, padding: "0.55rem 0.75rem", fontSize: "0.85rem" }}
      />
      <label style={{ fontSize: "0.78rem", color: "#5A6478", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Upload size={14} />
        <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} style={{ fontSize: "0.78rem" }} />
      </label>

      {error && <div style={{ color: "#C41E3A", fontSize: "0.78rem" }}>{error}</div>}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#C9A961",
            color: "#0B1F3F",
            border: "none",
            borderRadius: 8,
            padding: "0.55rem 1rem",
            fontWeight: 700,
            fontSize: "0.8rem",
            cursor: saving ? "default" : "pointer",
          }}
        >
          {saving ? "Enregistrement..." : "Enregistrer l'employeur"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: "transparent",
            border: "1px solid #E4E0D6",
            borderRadius: 8,
            padding: "0.55rem 1rem",
            fontSize: "0.8rem",
            cursor: "pointer",
            color: "#5A6478",
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

function MessagesPanel({ candidatId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    load();
    const channel = supabase
      .channel(`messages-admin-${candidatId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `candidat_id=eq.${candidatId}` },
        (payload) => {
          setMessages((ms) => (ms.some((m) => m.id === payload.new.id) ? ms : [...ms, payload.new]));
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [candidatId]);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("messages")
      .select("*")
      .eq("candidat_id", candidatId)
      .order("created_at", { ascending: true });
    setMessages(data || []);
    setLoading(false);
  }

  async function sendReply() {
    if (!draft.trim()) return;
    setSending(true);
    await supabase.from("messages").insert({ candidat_id: candidatId, expediteur: "equipe", contenu: draft.trim() });
    setDraft("");
    await load();
    setSending(false);
  }

  return (
    <div
      style={{
        marginTop: "0.75rem",
        padding: "1rem",
        background: "#F7F5EF",
        borderRadius: 10,
        border: "1px solid #EFEAD9",
        width: "100%",
      }}
    >
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
          <Loader2 size={18} color="#0B1F3F" />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: 220, overflowY: "auto", marginBottom: "0.75rem" }}>
          {messages.length === 0 && (
            <div style={{ fontSize: "0.8rem", color: "#8A8579", textAlign: "center" }}>Aucun message pour l'instant.</div>
          )}
          {messages.map((m) => (
            <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.expediteur === "equipe" ? "flex-end" : "flex-start" }}>
              <div
                style={{
                  background: m.expediteur === "equipe" ? "#0B1F3F" : "#FFFFFF",
                  color: m.expediteur === "equipe" ? "#F7F5EF" : "#1B2431",
                  border: m.expediteur === "equipe" ? "none" : "1px solid #E4E0D6",
                  padding: "0.5rem 0.8rem",
                  borderRadius: 10,
                  maxWidth: "75%",
                  fontSize: "0.83rem",
                }}
              >
                {m.contenu}
              </div>
              {m.expediteur === "equipe" && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.2rem" }}>
                  {m.lu ? <CheckCheck size={12} color="#C9A961" /> : <Check size={12} color="#B7BEC9" />}
                  <span style={{ fontSize: "0.62rem", color: "#8A8579" }}>{m.lu ? "Vu" : "Envoyé"}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendReply()}
          placeholder="Répondre au candidat..."
          style={{ flex: 1, border: "1px solid #E4E0D6", borderRadius: 8, padding: "0.55rem 0.8rem", fontSize: "0.83rem" }}
        />
        <button
          onClick={sendReply}
          disabled={sending}
          style={{
            background: "#C9A961",
            border: "none",
            borderRadius: 8,
            width: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: sending ? "default" : "pointer",
          }}
        >
          <Send size={15} color="#0B1F3F" />
        </button>
      </div>
    </div>
  );
}

function CandidatsList() {
  const [loading, setLoading] = useState(true);
  const [candidats, setCandidats] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [employeurFormFor, setEmployeurFormFor] = useState(null);
  const [messagesFor, setMessagesFor] = useState(null);

  useEffect(() => {
    load();
    const channel = supabase
      .channel("messages-admin-list")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          if (payload.new.expediteur !== "candidat") return;
          setCandidats((cs) =>
            cs.map((c) =>
              c.id === payload.new.candidat_id && !(c.messages || []).some((m) => m.id === payload.new.id)
                ? { ...c, messages: [...(c.messages || []), payload.new] }
                : c
            )
          );
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("candidats")
      .select(
        "id, nom, prenom, email, candidatures(poste_vise), suivi_candidat(id, statut, etape_id, etapes_process(nom_etape, ordre)), messages(id, expediteur, lu)"
      )
      .order("id", { ascending: false });

    setCandidats(data || []);
    setLoading(false);
  }

  function currentStep(candidat) {
    const steps = (candidat.suivi_candidat || []).slice().sort((a, b) => a.etapes_process.ordre - b.etapes_process.ordre);
    return steps.find((s) => s.statut === "En cours") || null;
  }

  async function validerEtape(suiviId) {
    setUpdatingId(suiviId);
    await supabase.from("suivi_candidat").update({ statut: "Validé" }).eq("id", suiviId);
    await load();
    setUpdatingId(null);
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem" }}>
        <Loader2 size={26} color="#0B1F3F" />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <Users size={20} color="#0B1F3F" />
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", color: "#0B1F3F", margin: 0 }}>
          Candidats ({candidats.length})
        </h1>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {candidats.map((c) => {
          const step = currentStep(c);
          const nomComplet = [c.prenom, c.nom].filter(Boolean).join(" ") || c.email;
          const poste = c.candidatures?.[0]?.poste_vise;
          const unreadCount = (c.messages || []).filter((m) => m.expediteur === "candidat" && !m.lu).length;
          return (
            <div
              key={c.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #EFEAD9",
                borderRadius: 10,
                padding: "0.9rem 1.1rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.92rem" }}>{nomComplet}</div>
                  <div style={{ fontSize: "0.78rem", color: "#5A6478" }}>
                    {poste ? `Poste visé : ${poste}` : "Candidature non soumise"}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  {step ? (
                    <>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "#8A6D2F",
                          background: "#F4EDD9",
                          border: "1px solid #E3CD8F",
                          borderRadius: 999,
                          padding: "0.3rem 0.7rem",
                        }}
                      >
                        {step.etapes_process.nom_etape}
                      </span>

                      {step.etapes_process.nom_etape === "Recherche d'Employeur" && (
                        <button
                          onClick={() => setEmployeurFormFor(employeurFormFor === c.id ? null : c.id)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                            background: "transparent",
                            border: "1px solid #0B1F3F",
                            color: "#0B1F3F",
                            borderRadius: 8,
                            padding: "0.48rem 0.8rem",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            cursor: "pointer",
                          }}
                        >
                          <Building2 size={14} />
                          {employeurFormFor === c.id ? "Fermer" : "Ajouter employeur"}
                        </button>
                      )}

                      <button
                        onClick={() => validerEtape(step.id)}
                        disabled={updatingId === step.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          background: "#0B1F3F",
                          color: "#F7F5EF",
                          border: "none",
                          borderRadius: 8,
                          padding: "0.5rem 0.85rem",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: updatingId === step.id ? "default" : "pointer",
                          opacity: updatingId === step.id ? 0.6 : 1,
                        }}
                      >
                        {updatingId === step.id ? <Loader2 size={14} /> : <CheckCircle2 size={14} />}
                        Valider
                      </button>
                    </>
                  ) : (
                    <span style={{ fontSize: "0.78rem", color: "#8A8579" }}>Aucune étape en cours</span>
                  )}

                  <button
                    onClick={async () => {
                      const opening = messagesFor !== c.id;
                      setMessagesFor(opening ? c.id : null);
                      if (opening && unreadCount > 0) {
                        const unreadIds = c.messages.filter((m) => m.expediteur === "candidat" && !m.lu).map((m) => m.id);
                        await supabase.from("messages").update({ lu: true }).in("id", unreadIds);
                        setCandidats((cs) =>
                          cs.map((cand) =>
                            cand.id === c.id
                              ? { ...cand, messages: cand.messages.map((m) => (unreadIds.includes(m.id) ? { ...m, lu: true } : m)) }
                              : cand
                          )
                        );
                      }
                    }}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      background: "transparent",
                      border: "1px solid #E4E0D6",
                      color: "#5A6478",
                      borderRadius: 8,
                      padding: "0.48rem 0.8rem",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <MessageCircle size={14} />
                    Messages
                    {unreadCount > 0 && (
                      <span
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          background: "#C41E3A",
                          color: "#FFFFFF",
                          borderRadius: "50%",
                          minWidth: 17,
                          height: 17,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.6rem",
                          fontWeight: 700,
                          border: "2px solid #F7F5EF",
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {employeurFormFor === c.id && (
                <EmployeurForm
                  candidatId={c.id}
                  onCancel={() => setEmployeurFormFor(null)}
                  onSaved={() => {
                    setEmployeurFormFor(null);
                    load();
                  }}
                />
              )}

              {messagesFor === c.id && <MessagesPanel candidatId={c.id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TemoignagesSection() {
  const [prenom, setPrenom] = useState("");
  const [ville, setVille] = useState("");
  const [poste, setPoste] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [captureFile, setCaptureFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [temoignages, setTemoignages] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    loadList();
  }, []);

  async function loadList() {
    setLoadingList(true);
    const { data } = await supabase.from("temoignages").select("*").order("created_at", { ascending: false });
    setTemoignages(data || []);
    setLoadingList(false);
  }

  async function uploadFile(file, folder) {
    const filePath = `${folder}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from("photos").upload(filePath, file);
    if (uploadError) throw uploadError;
    const { data } = supabase.storage.from("photos").getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    try {
      const photo_url = photoFile ? await uploadFile(photoFile, "temoignages-photos") : null;
      const capture_url = captureFile ? await uploadFile(captureFile, "temoignages-captures") : null;

      const { error: insertError } = await supabase.from("temoignages").insert({ prenom, ville, poste, photo_url, capture_url });
      if (insertError) throw insertError;

      setPrenom("");
      setVille("");
      setPoste("");
      setPhotoFile(null);
      setCaptureFile(null);
      setSuccess(true);
      loadList();
    } catch {
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
    setSaving(false);
  }

  const inputStyle = { border: "1px solid #E4E0D6", borderRadius: 8, padding: "0.6rem 0.85rem", fontSize: "0.85rem" };

  return (
    <div style={{ maxWidth: 980, margin: "0 auto", padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" }}>
        <Star size={20} color="#0B1F3F" />
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", color: "#0B1F3F", margin: 0 }}>
          Témoignages
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "#FFFFFF",
          border: "1px solid #EFEAD9",
          borderRadius: 12,
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.6rem" }}>
          <input placeholder="Prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required style={inputStyle} />
          <input placeholder="Ville d'origine" value={ville} onChange={(e) => setVille(e.target.value)} required style={inputStyle} />
          <input placeholder="Poste trouvé" value={poste} onChange={(e) => setPoste(e.target.value)} required style={inputStyle} />
        </div>

        <label style={{ fontSize: "0.8rem", color: "#5A6478", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Upload size={14} /> Photo du candidat
          <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} style={{ fontSize: "0.78rem" }} />
        </label>

        <label style={{ fontSize: "0.8rem", color: "#5A6478", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Upload size={14} /> Capture WhatsApp
          <input type="file" accept="image/*" onChange={(e) => setCaptureFile(e.target.files?.[0] || null)} style={{ fontSize: "0.78rem" }} />
        </label>

        {error && <div style={{ color: "#C41E3A", fontSize: "0.82rem" }}>{error}</div>}
        {success && <div style={{ color: "#2F7A4D", fontSize: "0.82rem" }}>Témoignage publié.</div>}

        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#C9A961",
            color: "#0B1F3F",
            border: "none",
            borderRadius: 9,
            fontWeight: 700,
            fontSize: "0.88rem",
            cursor: saving ? "default" : "pointer",
            alignSelf: "flex-start",
            padding: "0.65rem 1.4rem",
          }}
        >
          {saving ? "Publication..." : "Valider et publier"}
        </button>
      </form>

      {loadingList ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          <Loader2 size={22} color="#0B1F3F" />
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
          {temoignages.map((t) => (
            <div key={t.id} style={{ background: "#FFFFFF", border: "1px solid #EFEAD9", borderRadius: 10, padding: "0.85rem" }}>
              <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.88rem" }}>
                {t.prenom}, {t.ville}
              </div>
              <div style={{ fontSize: "0.78rem", color: "#5A6478" }}>{t.poste}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState("candidats");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0B1F3F" }}>
        <Loader2 size={28} color="#C9A961" />
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  if (session.user.email !== ADMIN_EMAIL) {
    return <AccesRefuse onLogout={() => supabase.auth.signOut()} />;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F7F5EF", fontFamily: "'Inter', sans-serif" }}>
      <header
        style={{
          background: "#0B1F3F",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Mountain size={20} color="#C9A961" />
          <span style={{ color: "#F7F5EF", fontWeight: 700, fontSize: "0.9rem" }}>Dashboard admin</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={() => setTab("candidats")}
            style={{
              background: tab === "candidats" ? "#C9A961" : "transparent",
              color: tab === "candidats" ? "#0B1F3F" : "#C7D0E0",
              border: tab === "candidats" ? "none" : "1px solid #2A4066",
              borderRadius: 999,
              padding: "0.4rem 0.9rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Candidats
          </button>
          <button
            onClick={() => setTab("temoignages")}
            style={{
              background: tab === "temoignages" ? "#C9A961" : "transparent",
              color: tab === "temoignages" ? "#0B1F3F" : "#C7D0E0",
              border: tab === "temoignages" ? "none" : "1px solid #2A4066",
              borderRadius: 999,
              padding: "0.4rem 0.9rem",
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Témoignages
          </button>
        </div>

        <button
          onClick={() => supabase.auth.signOut()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "transparent",
            border: "1px solid #2A4066",
            color: "#C7D0E0",
            borderRadius: 999,
            padding: "0.4rem 0.85rem",
            fontSize: "0.78rem",
            cursor: "pointer",
          }}
        >
          <LogOut size={13} />
          Déconnexion
        </button>
      </header>
      {tab === "candidats" ? <CandidatsList /> : <TemoignagesSection />}
    </div>
  );
}