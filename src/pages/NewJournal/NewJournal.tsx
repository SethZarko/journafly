import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router";
import { motion } from "motion/react";

import type { IJournal } from "../../App";

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
  const navigate = useNavigate()

  // Outlet Journal Context State
  const [, setJournals] =
    useOutletContext<
      [IJournal[], React.Dispatch<React.SetStateAction<IJournal[]>>]
    >();

  // Form State
  const [form, setForm] = useState<IFormState>(intialFormState);

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
    };

    setJournals((prev) => [...prev, newJournal]);

    setForm(intialFormState);
    navigate('/all')
    window.scrollTo(0, 0);
  };

  const btnDisabled: boolean = !form.title || !form.entry

  return (
    <section id="new-journal" className={styles.newJournalPage}>
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <form className="container" onSubmit={handleForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Journal Title</label>
            <input
              id="title"
              type="text"
              name="title"
              maxLength={100}
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="entry">
              Journal Entry <small>({form.entry.length <= 1500 ? 1500 - form.entry.length : 0} characters left)</small>
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
          <button type="submit" disabled={btnDisabled}>Post Journal</button>
        </form>
      </motion.div>
    </section>
  );
};
