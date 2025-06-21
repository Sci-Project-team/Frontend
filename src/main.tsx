import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EnvoyerMessage from "./pages/EnvoyerMessage";
import MessageRecuWrapper from "./pages/MessageRecu";
import HistoriqueWrapper from "./pages/Historique";
import LogsWrapper from "./pages/Logs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import TokenDisplay from "./pages/TokenDisplay";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("L'élément avec l'id 'root' est introuvable.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route path="/token-display" element={<TokenDisplay />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<EnvoyerMessage />} />
              <Route path="recu" element={<MessageRecuWrapper />} />
              <Route path="historique" element={<HistoriqueWrapper />} />
              <Route path="logs" element={<LogsWrapper />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
