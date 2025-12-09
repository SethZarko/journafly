import { useOutletContext } from "react-router";
import { Link } from "react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import type { IJournal } from "../../App";

import styles from "./AllJournals.module.scss";

export const AllJournals: React.FC = (): React.ReactNode => {
  const [sortedJournals] = useOutletContext<[IJournal[]]>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: sortedJournals?.length ?? 0,
    estimateSize: () => 300,
    getScrollElement: () => scrollRef.current,
  });

  if (!sortedJournals.length) return null;

  return (
    <section id="all-journals">
      <div ref={scrollRef} style={{ height: "100dvh", overflowY: "auto" }}>
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
                    {journal.title.length > 50
                      ? journal.title.slice(0, 45) + "....."
                      : journal.title}
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
      </div>
    </section>
  );
};
