import ClassCard from "./ClassCard";
import styles from "./ClassSwipeList.module.scss";

export default function ClassSwipeList({ classes, compact = false }) {
  return (
    <div className={`${styles.scroller} ${compact ? styles.compact : ""}`}>
      {classes.map((c) => (
        <ClassCard key={c.id} classItem={c} />
      ))}
    </div>
  );
}
