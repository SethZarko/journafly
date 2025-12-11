import { Link } from "react-router";
import { FaUniversity } from "react-icons/fa";

import type { IData } from "../../App";

import styles from "./Header.module.scss";

interface IHeaderProps {
  quotes: IData | null
  currentQuote: number
  author: string
}

export const Header: React.FC<IHeaderProps>= ({ quotes, currentQuote, author }): React.ReactNode => {

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.headerLogoContainer}>
          <h1 title="Return Home">
            <Link to="/">JournaFly</Link>
          </h1>
          <Link to="/">
            <FaUniversity className={styles.homeIcon} title="Return Home" />
          </Link>
        </div>

        <Link to="/new" state={ { quote: quotes?.quotes[currentQuote - 1].quote, work: quotes?.quotes[currentQuote - 1].work, author: author.split("+").join(" ") } }>
          <button>New Journal +</button>
        </Link>
      </div>
    </header>
  );
};
