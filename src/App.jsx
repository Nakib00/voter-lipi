import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { VoterProvider } from "./context/VoterContext";
import Home from "./pages/Home";
import ResultList from "./pages/ResultList";
import VoterDetails from "./pages/VoterDetails";
import SplashScreen from "./components/SplashScreen";

import PrintPreview from "./pages/PrintPreview";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5s splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <VoterProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<ResultList />} />
        <Route path="/details/:id" element={<VoterDetails />} />
        <Route path="/print-preview/:id" element={<PrintPreview />} />
      </Routes>
    </VoterProvider>
  );
}

export default App;
