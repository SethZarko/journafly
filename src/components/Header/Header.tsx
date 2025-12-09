import { Link } from "react-router";

import styles from './Header.module.scss'

export const Header: React.FC = (): React.ReactNode => {
  return (
    <header>
      <div className={styles.headerWrapper}>
        <h1><Link to="/">JournaFly</Link></h1>
        <Link to="/new">
          <button>New Journal +</button>
        </Link>
      </div>
    </header>
  );
};
