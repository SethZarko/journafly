import { useState, useEffect } from "react";
import { InspirationCard } from "./InspirationCard/InspirationCard";
import { Pagination } from "../Pagination/Pagination";

interface IQuotes {
  id: string;
  quote: string;
  work: string;
}

interface IData {
  id: string;
  quotes: IQuotes[];
  name: string;
}

interface IInspirationProps {
  philosopher: string;
}

export const Inspiration: React.FC<IInspirationProps> = ({
  philosopher,
}): React.ReactNode => {
  const [data, setData] = useState<IData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
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
        setData(json);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData(philosopher);
    setCurrentPage(1);
  }, [philosopher]);

  // Pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirsQuote = indexOfLastQuote - quotesPerPage;
  const currentQuote = data?.quotes
    ?.slice(0, 5)
    ?.slice(indexOfFirsQuote, indexOfLastQuote);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
          name={data?.name}
          quote={quote?.quote}
          work={quote?.work}
          search={authorSearch}
        />
      ))}
      <Pagination
        itemsPerPage={quotesPerPage}
        totalItems={data?.quotes?.slice(0, 5)?.length}
        currentPage={currentPage}
        paginate={handlePagination}
      />
    </div>
  );
};
