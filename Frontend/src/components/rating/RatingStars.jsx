import { useState } from "react";
import styles from "./RatingStars.module.scss";

function Star({ filled }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default function RatingStars({
  average = 0,
  count,
  interactive = false,
  hasRated = false,
  onRate,
}) {
  const [hovered, setHovered] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const displayValue = interactive && hovered ? hovered : Math.round(average);

  async function handleClick(value) {
    if (!interactive || hasRated || submitting) return;
    setSubmitting(true);
    try {
      await onRate(value);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.stars} ${interactive && !hasRated ? styles.interactive : ""}`}
        role={interactive && !hasRated ? "radiogroup" : undefined}
        aria-label={
          interactive && !hasRated
            ? "Rate this class from 1 to 5"
            : `Rated ${average} out of 5`
        }
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            className={styles.star}
            disabled={!interactive || hasRated || submitting}
            onMouseEnter={() => interactive && setHovered(value)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => handleClick(value)}
            aria-label={`${value} star${value > 1 ? "s" : ""}`}
          >
            <Star filled={value <= displayValue} />
          </button>
        ))}
      </div>
      {typeof count === "number" && (
        <span className={styles.count}>({count})</span>
      )}
      {interactive && hasRated && (
        <span className={styles.ratedLabel}>You rated this class</span>
      )}
    </div>
  );
}
