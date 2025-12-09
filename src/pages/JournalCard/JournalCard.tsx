import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { useState } from "react";

import type { IJournal } from "../../App";

import styles from "./JournalCard.module.scss";

export const JournalCard: React.FC = (): React.ReactNode => {
  const { id } = useParams();
  const navigate = useNavigate()

  const [sortedJournals, setJournals] =
    useOutletContext<
      [IJournal[], React.Dispatch<React.SetStateAction<IJournal[]>>]
  >();

  const currentJournal: IJournal | undefined = sortedJournals?.find(j => j.id === id);

  const [readOnly, setReadOnly] = useState<boolean>(true);
  const [form, setForm] = useState<IJournal>(
    currentJournal || {
      id: '',
      title: '',
      entry: '',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => setReadOnly(false);

  const handleCancel = () => {
    setReadOnly(true);
    setForm(currentJournal || {
      id: '',
      title: '',
      entry: '',
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    });
  };

  const handleSave = () => {
    setJournals((prev: IJournal[]) =>
      prev.map((j: IJournal) => {
        if (j.id === form.id) {
          return {
            ...form,
            date: new Date().toISOString(),
          };
        }
        return j;
      })
    );
    setReadOnly(true);
  };

  const handleDelete = (id: string | undefined) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this journal entry?');

    if (!confirmDelete) {
      return; 
    }

    setJournals(prev => prev.filter(j => j.id !== id));
    navigate('/all')
  }

  const handlePageReturn = () => {
    window.scrollTo(0, 0)
  }

  const max = 1500;
  const charsUsed = form.entry.length;
  const charRemain = 1500 - charsUsed

  return (
    <section id="journal-entry" className={styles.journalEntry}>
      <div>
        <div className={styles.titleContainer}>
          <textarea
            id="entry-title"
            name="title"
            className={readOnly ? styles.readTitle : styles.editTitle}
            readOnly={readOnly}
            maxLength={100}
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <code>
          <small>{new Date(form.date).toDateString()}</small>
        </code>

        {!readOnly && (
          <label className={styles.showCount}>
            Edit Journal Entry: <small>({charRemain} characters left)</small>
          </label>
        )}

        <textarea
          id="entry-edit"
          name="entry"
          className={readOnly ? styles.read : styles.edit}
          readOnly={readOnly}
          maxLength={max}
          value={form.entry}
          onChange={handleChange}
        />
         <span className={styles.btnContainer}>
            <button
              onClick={readOnly ? handleEdit : handleSave}
              className={readOnly ? styles.editBtn : styles.saveBtn}
            >
              {readOnly ? "Edit" : "Save"}
            </button>
            {!readOnly && (
              <button onClick={handleCancel} className={styles.cancelBtn}>
                Cancel
              </button>
            )}
            {readOnly && (
              <button onClick={() => handleDelete(currentJournal?.id)} className={styles.deleteBtn}>
                Delete
              </button>
            )}
          </span>
      </div>
      <span className={styles.backBtn}>
        <Link to='/all' onClick={handlePageReturn}>
          <button>
            Return to all Journals
          </button>
        </Link>
      </span>
    </section>
  );
};