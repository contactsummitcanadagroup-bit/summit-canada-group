import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./index.css";

import App, { AuthScreen, Dashboard } from "./App.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AccueilPage from "./AccueilPage.jsx";
import AProposPage from "./AProposPage.jsx";
import TemoignagesPage from "./TemoignagesPage.jsx";
import PaiementConfirmePage from "./PaiementConfirmePage.jsx";
import ResetPasswordPage from "./ResetPasswordPage.jsx";
import { useNavigate } from "react-router-dom";

// Détecte un lien de récupération de mot de passe, peu importe la page d'atterrissage,
// et redirige automatiquement vers l'écran de réinitialisation.
function RecoveryWatcher() {
  const navigate = useNavigate();
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      }
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate]);
  return null;
}

function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  return { session, loading };
}

// Racine "/" : Accueil (visiteur) ou Dashboard/formulaire (candidat connecté)
function RootRoute() {
  const { session, loading } = useSession();
  if (loading) return null;
  return session ? <Dashboard session={session} onLogout={() => supabase.auth.signOut()} /> : <AccueilPage />;
}

// "/apropos" : réservé aux visiteurs non connectés, redirige sinon
function AProposRoute() {
  const { session, loading } = useSession();
  if (loading) return null;
  return session ? <Navigate to="/" replace /> : <AProposPage />;
}

// "/temoignages" : accessible à tous, adapte juste la nav/CTA selon la connexion
function TemoignagesRoute() {
  const { session, loading } = useSession();
  if (loading) return null;
  return <TemoignagesPage isLoggedIn={!!session} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RecoveryWatcher />
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/apropos" element={<AProposRoute />} />
        <Route path="/temoignages" element={<TemoignagesRoute />} />
        <Route path="/inscription" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/paiement-confirme" element={<PaiementConfirmePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);