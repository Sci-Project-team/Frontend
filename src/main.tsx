import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import EnvoyerMessage from "./pages/EnvoyerMessage";
import MessageRecuWrapper from "./pages/MessageRecu";
import HistoriqueWrapper from "./pages/Historique";
import './index.css';
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("L'élément avec l'id 'root' est introuvable.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EnvoyerMessage />} />
          <Route path="recu" element={<MessageRecuWrapper />} />
          <Route path="historique" element={<HistoriqueWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
