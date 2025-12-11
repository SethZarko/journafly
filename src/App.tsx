import { useState, useEffect, useMemo } from "react";
import { Outlet } from "react-router";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

interface IInspiration {
  quote: string
  work: string
  author: string
}

export interface IJournal {
  id: string;
  title: string;
  entry: string;
  date: string | Date;
  createdAt: string;
  inspiration?: IInspiration 
}

export interface IQuotes {
  id: string;
  quote: string;
  work: string;
}

export interface IData {
  id: string;
  quotes: IQuotes[];
  name: string;
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
  const [quotes, setQuotes] = useState<IData | null>(null)
  const [currentQuote, setCurrentQuote] = useState<number>(1)
  const [selectedName, setSelectedName] = useState<string>("Socrates");

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
      <Header quotes={quotes} currentQuote={currentQuote} author={selectedName} />
      <Outlet context={
        [
          sortedJournals, 
          setJournals, 
          quotes, 
          setQuotes, 
          setCurrentQuote,
          selectedName,
          setSelectedName

        ] as const} />
      <Footer />
    </div>
  );
}

export default App;
