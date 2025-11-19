import React from "react";
import { HashRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import Homepage from "./pages/Homepage";
import DetailPage from "./pages/DetailPage";

export default function App() {
  return (
    <Router> {/* ← Bọc toàn bộ app bằng HashRouter */}
      <div className="app-root">
        <header className="topbar">
          <div className="container topbar-inner">
            <Link to="/photos" className="brand">Picsum Explorer</Link>
          </div>
        </header>

        <main className="container main">
          <Routes>
            <Route path="/" element={<Navigate to="/photos" replace />} />
            <Route path="/photos" element={<Homepage />} />
            <Route path="/photos/:id" element={<DetailPage />} />
            <Route
              path="*"
              element={
                <div style={{ padding: 40 }}>
                  Page not found. <Link to="/photos">Back</Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">Built with React (CRA) • Lorem Picsum API</div>
        </footer>
      </div>
    </Router>
  );
}
