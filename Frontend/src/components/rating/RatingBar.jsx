import styles from "./RatingBar.module.scss";

export default function RatingBar({ average = 0, count }) {
  const percent = Math.max(0, Math.min(100, (average / 5) * 100));

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.track}
        role="img"
        aria-label={`Rated ${average.toFixed(1)} out of 5${
          typeof count === "number" ? ` (${count} ratings)` : ""
        }`}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
