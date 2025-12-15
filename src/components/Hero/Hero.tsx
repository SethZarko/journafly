import { Link } from "react-router";
import styles from "./Hero.module.scss";
import { Inspiration } from "../Inspiration/Inspiration";
import { PhilosopherSelect } from "../PhilosopherSelect/PhilosopherSelect";
import { RecentJournals } from "../RecentJournals/RecentJournals";
import { useAppState } from "../../context/AppStateContext";

export const Hero: React.FC = (): React.ReactNode => {
  const { selectedName, setSelectedName } = useAppState()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedName(value);
  };

  const handlePageReturn = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className={`container-fluid ${styles.contentWrapper}`}>
        <div className={styles.contentContainer}>
          <div className={styles.heroCard}>
            <div className={styles.titleContainer}>
              <h4>Recent Journals</h4>
              <RecentJournals />
            </div>
          </div>

          <div className={styles.heroCard}>
            <div className={styles.titleContainer}>
              <h4>Inspiration</h4>
              <PhilosopherSelect
                selectedName={selectedName}
                handleChange={handleChange}
              />
            </div>
            <Inspiration philosopher={selectedName} />
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Link to="/all" className={styles.button}>
            <button onClick={handlePageReturn}>View All Journals</button>
          </Link>
        </div>
      </section>
    </>
  );
};
