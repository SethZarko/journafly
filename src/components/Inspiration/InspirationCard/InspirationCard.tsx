import styles from "./InspirationCard.module.scss";

interface InspirationCardProps {
  name: string | undefined;
  quote: string;
  work: string;
  search: string | undefined;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({
  name,
  quote,
  work,
  search,
}): React.ReactNode => {

  const searchTag = (() => {
    switch (search) {
      case "wilhelm":
        return "hegel";
      case "Heraclitus":
        return "heraclit";
      case "Parmenides":
        return "parmenid";
      case "aurelius":
        return "marcus-aurelius"
      case "Epicurus":
        return "epicur"
      case "hobbes":
        return "home"
      case "stuart":
        return "milljs"
      case "kierkegaard":
        return "kierkega"
      case "russell":
        return "russ-eth"
      case "wittgenstein":
        return "wittgens"
      case "heidegger":
        return "heidegge"
      default:
        return search;
    }
  })();

  if (!quote) return null;

  return (
    <div className={styles.card}>
      <h6>
        <em>{name}:</em>
      </h6>
      <blockquote>"{quote}"</blockquote>
      <div className={styles.workContainer}>
        <p>
          <small>{work}</small>
        </p>
        <button>
          <a
            href={`https://www.iep.utm.edu/${searchTag}/`}
            target="_blank"
            rel="noopener"
          >
            Author
          </a>
        </button>
      </div>
    </div>
  );
};
