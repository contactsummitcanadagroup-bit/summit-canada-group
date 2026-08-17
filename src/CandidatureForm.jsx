import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";

const SUPABASE_URL = "https://ifkbzojpvyxahrhkjjzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5ba4N2NNBn1KZP6tJLEnzw_11W9bCZ4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------------------------------------------------------------------------
// Formulaire de candidature. À intégrer dans le Dashboard : ne s'affiche que
// si aucune ligne "candidatures" n'existe encore pour ce candidat.
// ---------------------------------------------------------------------------

const NIVEAUX_ETUDES = ["Aucun diplôme", "Certificat / CAP", "Baccalauréat", "Licence", "Master", "Autre"];

export default function CandidatureForm({ candidatId, onSubmitted }) {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    age: "",
    niveau_etudes: "",
    domaine_experience: "",
    annees_experience: "",
    poste_vise: "",
    motivation: "",
    consentement_paiement: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.consentement_paiement) {
      setError("Vous devez accepter les conditions de paiement pour continuer.");
      return;
    }

    setSubmitting(true);

    const { error: updateError } = await supabase
      .from("candidats")
      .update({ prenom: form.prenom, nom: form.nom })
      .eq("id", candidatId);

    if (updateError) {
      setError("Une erreur est survenue. Merci de réessayer.");
      setSubmitting(false);
      return;
    }

    const { error } = await supabase.from("candidatures").insert({
      candidat_id: candidatId,
      age: form.age ? parseInt(form.age, 10) : null,
      niveau_etudes: form.niveau_etudes,
      domaine_experience: form.domaine_experience,
      annees_experience: form.annees_experience ? parseInt(form.annees_experience, 10) : null,
      poste_vise: form.poste_vise,
      motivation: form.motivation,
      consentement_paiement: form.consentement_paiement,
    });
    setSubmitting(false);

    if (error) {
      setError("Une erreur est survenue. Merci de réessayer.");
      return;
    }

    onSubmitted?.();
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #E4E0D6",
    borderRadius: 9,
    padding: "0.7rem 0.9rem",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    background: "#FFFFFF",
    color: "#1B2431",
  };

  const labelStyle = {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#3A4356",
    marginBottom: "0.4rem",
    display: "block",
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        boxShadow: "0 12px 30px rgba(11,31,63,0.1)",
        border: "1px solid #EFEAD9",
        padding: "1.75rem",
        maxWidth: 560,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "#0B1F3F",
          marginBottom: "0.4rem",
        }}
      >
        Compléter ma candidature
      </div>
      <p style={{ fontSize: "0.85rem", color: "#5A6478", marginBottom: "1.5rem" }}>
        Quelques informations pour que nous puissions vous trouver le bon employeur.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Prénom</label>
            <input
              type="text"
              required
              value={form.prenom}
              onChange={(e) => update("prenom", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Nom</label>
            <input
              type="text"
              required
              value={form.nom}
              onChange={(e) => update("nom", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <label style={labelStyle}>Âge</label>
            <input
              type="number"
              min="16"
              max="99"
              required
              value={form.age}
              onChange={(e) => update("age", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Niveau d'études</label>
            <select
              required
              value={form.niveau_etudes}
              onChange={(e) => update("niveau_etudes", e.target.value)}
              style={inputStyle}
            >
              <option value="" disabled>
                Choisir...
              </option>
              {NIVEAUX_ETUDES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label style={labelStyle}>Domaine d'expérience / métier actuel</label>
          <input
            type="text"
            required
            placeholder="Ex : logistique, restauration, bâtiment..."
            value={form.domaine_experience}
            onChange={(e) => update("domaine_experience", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Années d'expérience</label>
          <input
            type="number"
            min="0"
            max="60"
            required
            value={form.annees_experience}
            onChange={(e) => update("annees_experience", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Dans quel domaine aimeriez-vous travailler au Canada ?</label>
          <input
            type="text"
            required
            placeholder="Ex : entrepôt, soins à la personne, transport..."
            value={form.poste_vise}
            onChange={(e) => update("poste_vise", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label style={labelStyle}>Votre motivation, en quelques lignes</label>
          <textarea
            required
            rows={3}
            value={form.motivation}
            onChange={(e) => update("motivation", e.target.value)}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
          />
        </div>

        <label
          style={{
            display: "flex",
            gap: "0.6rem",
            alignItems: "flex-start",
            fontSize: "0.8rem",
            color: "#3A4356",
            lineHeight: 1.5,
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={form.consentement_paiement}
            onChange={(e) => update("consentement_paiement", e.target.checked)}
            style={{ marginTop: "0.15rem" }}
          />
          Je comprends et j'accepte de payer les frais de dossier et d'accompagnement dans le cadre de ce processus.
        </label>

        {error && <div style={{ color: "#C41E3A", fontSize: "0.82rem" }}>{error}</div>}

        <button
          type="submit"
          disabled={submitting}
          style={{
            background: "#C9A961",
            color: "#0B1F3F",
            border: "none",
            borderRadius: 9,
            padding: "0.85rem",
            fontWeight: 700,
            fontSize: "0.92rem",
            cursor: submitting ? "default" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting && <Loader2 size={16} />}
          Envoyer ma candidature
        </button>
      </form>
    </div>
  );
}