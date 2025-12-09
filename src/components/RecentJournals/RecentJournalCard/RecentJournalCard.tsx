import type { IJournal } from "../../../App";

import style from "./RecentJournalCard.module.scss";

export const RecentJournalCard: React.FC<IJournal> = ({
  title,
  entry,
  date,
}): React.ReactNode => {
  return (
    <div className={style.journalEntry}>
      <h2>{title}</h2>
      <code>
        <small>{new Date(date).toDateString()}</small>
      </code>
      <p>
        {entry.length > 120
          ? entry.slice(0, 120) + "..."
          : entry}
      </p>
    </div>
  );
};
