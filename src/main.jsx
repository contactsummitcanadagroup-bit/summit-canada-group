import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "./index.css";

import App, { AuthScreen, Dashboard } from "./App.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import AccueilPage from "./AccueilPage.jsx";
import AProposPage from "./AProposPage.jsx";
import TemoignagesPage from "./TemoignagesPage.jsx";
import PaiementConfirmePage from "./PaiementConfirmePage.jsx";

const SUPABASE_URL = "https://ifkbzojpvyxahrhkjjzf.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_5ba4N2NNBn1KZP6tJLEnzw_11W9bCZ4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/apropos" element={<AProposRoute />} />
        <Route path="/temoignages" element={<TemoignagesRoute />} />
        <Route path="/inscription" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/paiement-confirme" element={<PaiementConfirmePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);