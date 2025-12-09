import { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

export interface IJournal {
  id: string;
  title: string;
  entry: string;
  date: string | Date;
  createdAt: string;
}

function App() {
  const [journals, setJournals] = useState<IJournal[]>(() => {
    try {
      const stored = localStorage.getItem("journals");
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return parsed;
    } catch {
      return [];
    }
  });

  const sortedJournals = useMemo(() => {
    return [...journals].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateA !== dateB) {
        return dateB - dateA; // Most recent first
      }
      // Tie-breaker: use createdAt (most recently created first)
      const createdA = new Date(a.createdAt).getTime();
      const createdB = new Date(b.createdAt).getTime();
      return createdB - createdA; // Most recent first
    });
  }, [journals]);

  useEffect(() => {
    localStorage.setItem("journals", JSON.stringify(sortedJournals));
  }, [sortedJournals]);

  return (
    <div className="app-wrapper">
      <Header />
      <Outlet context={[sortedJournals, setJournals] as const} />
      <Footer />
    </div>
  );
}

export default App;
