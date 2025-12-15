import { useState } from "react";
import { Pagination } from "../Pagination/Pagination";
import { RecentJournalCard } from "./RecentJournalCard/RecentJournalCard";

import type { IJournal } from "../../App";

import styles from "./RecentJournals.module.scss";
import { useAppState } from "../../context/AppStateContext";

export const RecentJournals: React.FC = (): React.ReactNode => {
  const { sortedJournals } = useAppState();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [quotesPerPage] = useState<number>(1);

  if (!sortedJournals.length)
    return (
      <div>
        <p style={{ color: "white" }}>Create a Journal!</p>
      </div>
    );

  // Pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirsQuote = indexOfLastQuote - quotesPerPage;
  const currentQuote = sortedJournals
    ?.slice(0, 5)
    ?.slice(indexOfFirsQuote, indexOfLastQuote);

  const handlePagination = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className={styles.card}>
        {currentQuote?.map((journal: IJournal, index: number) => (
          <RecentJournalCard key={index} {...journal} />
        ))}
      </div>
      <Pagination
        itemsPerPage={quotesPerPage}
        totalItems={sortedJournals?.slice(0, 5)?.length}
        currentPage={currentPage}
        paginate={handlePagination}
      />
    </div>
  );
};
