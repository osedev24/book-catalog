import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/pages/LandingPage";
import CatalogPage from "./components/pages/CatalogPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/catalog" element={<CatalogPage />} />
    </Routes>
  );
}
