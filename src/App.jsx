import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";

function App() {
  return (
    <div className="bg-zinc-100 dark:bg-zinc-800">
      <BrowserRouter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:pokemonname" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
