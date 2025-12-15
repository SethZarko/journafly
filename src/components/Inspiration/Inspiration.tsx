import { useState, useEffect } from "react";
import { InspirationCard } from "./InspirationCard/InspirationCard";
import { Pagination } from "../Pagination/Pagination";
import { useAppState } from "../../context/AppStateContext";

import type { IQuotes } from "../../types/IQuote";

interface IInspirationProps {
  philosopher: string;
}

export const Inspiration: React.FC<IInspirationProps> = ({
  philosopher,
}): React.ReactNode => {
  const { quotes, setQuotes, setCurrentQuote, currentPage, setCurrentPage } = useAppState()
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [quotesPerPage] = useState<number>(1);

  const authorSearch: string | undefined = philosopher.includes("+")
    ? philosopher?.split("+")?.at(1)?.toLowerCase()
    : philosopher;

  useEffect(() => {
    const fetchData = async (philosopher: string) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://philosophersapi.com/api/philosophers/name/${philosopher}`,
          {
            method: "GET",
          }
        );

        if (!res.ok)
          throw new Error(`Request failed with status ${res.status}`);

        const json = await res.json();
        setQuotes(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData(philosopher);
    setCurrentPage(1);
  }, [philosopher, setQuotes, setCurrentPage]);

  // Pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirsQuote = indexOfLastQuote - quotesPerPage;
  const currentQuote = quotes?.quotes
    ?.slice(0, 5)
    ?.slice(indexOfFirsQuote, indexOfLastQuote);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setCurrentQuote(pageNumber)
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {error && (
          <span className="error persistent">Error Fetching Data...</span>
        )}
      </div>

      {loading && <span className="loading">Loading...</span>}
      {currentQuote?.map((quote: IQuotes) => (
        <InspirationCard
          key={quote?.id}
          name={quotes?.name}
          quote={quote?.quote}
          work={quote?.work}
          search={authorSearch}
        />
      ))}
      <Pagination
        itemsPerPage={quotesPerPage}
        totalItems={quotes?.quotes?.slice(0, 5)?.length}
        currentPage={currentPage}
        paginate={handlePagination}
      />
    </div>
  );
};
