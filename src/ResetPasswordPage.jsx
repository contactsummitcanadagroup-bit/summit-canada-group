import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { Mountain, Loader2, CheckCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Summit Canada Group — Réinitialisation de mot de passe
// Atteinte via le lien reçu par email (Supabase gère la session de récupération).
// ---------------------------------------------------------------------------

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("Une erreur est survenue. Merci de réessayer.");
      return;
    }

    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
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
            SUMMIT <span style={{ color: "#C9A961" }}>CANADA GROUP</span>
          </div>
        </div>

        <div style={{ background: "#FFFFFF", borderRadius: 14, padding: "1.75rem" }}>
          {success ? (
            <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
              <CheckCircle2 size={32} color="#2F7A4D" style={{ marginBottom: "0.75rem" }} />
              <div style={{ fontWeight: 700, color: "#0B1F3F", marginBottom: "0.4rem" }}>Mot de passe mis à jour</div>
              <div style={{ fontSize: "0.85rem", color: "#5A6478" }}>Redirection en cours...</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ fontWeight: 700, color: "#0B1F3F", fontSize: "0.95rem", marginBottom: "0.2rem" }}>
                Choisissez un nouveau mot de passe
              </div>
              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ border: "1px solid #E4E0D6", borderRadius: 9, padding: "0.7rem 0.9rem", fontSize: "0.9rem", outline: "none" }}
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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
                Mettre à jour le mot de passe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}