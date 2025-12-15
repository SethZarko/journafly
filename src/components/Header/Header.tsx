import { Link, useLocation } from "react-router";
import { FaUniversity } from "react-icons/fa";

import type { IData } from "../../types/IData";

import styles from "./Header.module.scss";

interface IHeaderProps {
  quotes: IData | null;
  currentQuote: number;
  author: string;
}

export const Header: React.FC<IHeaderProps> = ({
  quotes,
  currentQuote,
  author,
}): React.ReactNode => {
  const location = useLocation();
  const newPagePathCheck = location.pathname === "/new";

  return (
    <header>
      <div className={styles.headerWrapper}>
        <Link to="/">
          <div className={styles.headerLogoContainer}>
            <h1 title="Return Home">JournaFly</h1>
            <FaUniversity className={styles.homeIcon} title="Return Home" />
          </div>
        </Link>

        {!newPagePathCheck ? (
          <Link
            to="/new"
            state={{
              quote: quotes?.quotes[currentQuote - 1].quote,
              work: quotes?.quotes[currentQuote - 1].work,
              author: author.split("+").join(" "),
            }}
          >
            <button>New Journal +</button>
          </Link>
        ) : (
          <Link to='/'>
            <button>Return Home</button>
          </Link>
        )}
      </div>
    </header>
  );
};
