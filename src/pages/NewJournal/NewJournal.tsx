import { useState, type CSSProperties } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useAppState } from "../../context/AppStateContext";

import type { IJournal } from "../../types/IJournal";

import styles from "./NewJournal.module.scss";

export interface IFormState {
  title: string;
  entry: string;
}

const intialFormState: IFormState = {
  title: "",
  entry: "",
};

export const NewJournal: React.FC = (): React.ReactNode => {
  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // Location State
  const quote: string = location.state.quote;
  const work: string = location.state.work;
  const author: string = location.state.author;

  // App Context State
  const { setJournals } = useAppState();

  // Local State
  const [form, setForm] = useState<IFormState>(intialFormState);
  const [showQuote, setShowQuote] = useState<boolean>(true);

  // Custom Styles
  let authorStyle: CSSProperties = {};

  if (work?.length && author?.length) {
    authorStyle = {
      flexDirection: work.length > 25 || author.length > 25 ? "column" : "row",
    };
  }

  // Functions
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    const newJournal: IJournal = {
      id: `journal_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      title: form.title,
      entry: form.entry,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      inspiration: {
        quote: quote,
        work: work,
        author: author,
      },
    };

    setJournals((prev) => [...prev, newJournal]);

    setForm(intialFormState);
    navigate("/all");
    window.scrollTo(0, 0);
  };

  const handleShowQuote = () => {
    setShowQuote((prev) => !prev);
  };

  const btnDisabled: boolean = !form.title || !form.entry;

  return (
    <section id="new-journal" className={styles.newJournalPage}>
      <motion.div
        className={styles.quoteContainer}
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <button onClick={handleShowQuote}>
          {!showQuote ? "Show Inspiration" : "Hide"}
        </button>

        <div className={styles.quoteWrapper}>
          {showQuote && (
            <>
              <blockquote>{quote}</blockquote>
              <small className={styles.authorWork} style={authorStyle}>
                <p>{author} - </p>
                <em>{work}</em>
              </small>
            </>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <form className="container" onSubmit={handleForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">
              Journal Title{" "}
              <small>
                ({form.title.length <= 30 ? 30 - form.title.length : 0}{" "}
                characters remaining)
              </small>
            </label>
            <input
              id="title"
              placeholder="Title of your entry..."
              type="text"
              name="title"
              maxLength={30}
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="entry">
              Journal Entry{" "}
              <small>
                ({form.entry.length <= 1500 ? 1500 - form.entry.length : 0}{" "}
                characters remaining)
              </small>
            </label>
            <textarea
              id="entry"
              placeholder="Write out your thoughts..."
              name="entry"
              maxLength={1500}
              value={form.entry}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" disabled={btnDisabled}>
            Post Journal
          </button>
        </form>
      </motion.div>
    </section>
  );
};
