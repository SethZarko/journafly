import { Link } from "react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useAppState } from "../../context/AppStateContext";

import type { IJournal } from "../../types/IJournal";

import styles from "./AllJournals.module.scss";

export const AllJournals: React.FC = (): React.ReactNode => {
  const { sortedJournals } = useAppState();
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: sortedJournals?.length ?? 0,
    estimateSize: () => 300,
    getScrollElement: () => scrollRef.current,
  });

  return (
    <section id="all-journals">
      {sortedJournals?.length === 0 && <div style={{ textAlign: 'center', color: 'lightgray', fontSize: '24px' }}>Add your first Journal!</div>}
      {sortedJournals?.length !== 0 && <div ref={scrollRef} style={{ height: "100dvh", overflowY: "auto" }}>
        <div
          className={styles.cardContainer}
          style={{
            position: "relative",
            height: `${virtualizer.getTotalSize()}px`,
          }}
        >
          {virtualizer.getVirtualItems().map((vItem, index: number) => {
            const journal: IJournal = sortedJournals?.[vItem.index];
            return (
              <div
                key={vItem.key}
                style={{
                  transform: `translateY(${vItem.start}px)`,
                  height: `${vItem.size}px`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  padding: 8,
                }}
                data-index={vItem.index}
              >
                <div key={index} className={styles.card}>
                  <h2>
                    {journal.title}
                  </h2>
                  <code>
                    <small>{new Date(journal.date).toDateString()}</small>
                  </code>
                  <p>
                    {journal.entry.length > 120
                      ? journal.entry.slice(0, 120) + "....."
                      : journal.entry}
                  </p>
                  <Link to={`/all/${journal.id}`}>Read More</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>}
    </section>
  );
};
