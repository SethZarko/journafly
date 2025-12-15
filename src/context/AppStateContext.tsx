import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { IData } from "../types/IData";
import type { IJournal } from "../types/IJournal";

interface AppStateContextType {
  journals: IJournal[];
  setJournals: React.Dispatch<React.SetStateAction<IJournal[]>>;
  sortedJournals: IJournal[];
  quotes: IData | null;
  setQuotes: React.Dispatch<React.SetStateAction<IData | null>>;
  currentQuote: number;
  setCurrentQuote: React.Dispatch<React.SetStateAction<number>>;
  selectedName: string;
  setSelectedName: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
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

  const [quotes, setQuotes] = useState<IData | null>(null);
  const [currentQuote, setCurrentQuote] = useState(1);
  const [selectedName, setSelectedName] = useState("Socrates");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <AppStateContext.Provider
      value={{
        journals,
        setJournals,
        sortedJournals,
        quotes,
        setQuotes,
        currentQuote,
        setCurrentQuote,
        selectedName,
        setSelectedName,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used inside AppStateProvider");
  return context;
}
