import { useState } from "react";
import styles from "./EnrollButton.module.scss";

export default function EnrollButton({
  classItem,
  isEnrolled,
  isDayTaken,
  onEnroll,
  onLeave,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setSubmitting(true);
    setError(null);
    try {
      if (isEnrolled) {
        await onLeave();
      } else {
        await onEnroll(classItem.id);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const blockedByDayConflict = !isEnrolled && isDayTaken;

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={`btn ${isEnrolled ? "btn--outline" : "btn--primary"} ${styles.button}`}
        onClick={handleClick}
        disabled={submitting || blockedByDayConflict}
      >
        {submitting ? "…" : isEnrolled ? "Leave" : "Sign up"}
      </button>
      {blockedByDayConflict && (
        <p className={styles.hint}>
          You're already signed up for a class on this day.
        </p>
      )}
      {error && (
        <p className="status-message status-message--error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
