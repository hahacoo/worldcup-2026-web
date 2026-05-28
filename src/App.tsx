import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import MatchPage from "@/pages/MatchPage";
import TeamPage from "@/pages/TeamPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:teamSlug" element={<TeamPage />} />
        <Route path="/match/:matchId" element={<MatchPage />} />
      </Routes>
    </HashRouter>
  );
}
