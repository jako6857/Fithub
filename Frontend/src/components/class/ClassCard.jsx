import { Link } from "react-router-dom";
import RatingBar from "../rating/RatingBar";
import styles from "./ClassCard.module.scss";

export default function ClassCard({ classItem }) {
  return (
    <Link to={`/class/${classItem.id}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={classItem.image} alt={classItem.name} loading="lazy" />
      </div>
      <p className={styles.name}>{classItem.name}</p>
      <RatingBar average={classItem.average ?? 0} count={classItem.count} />
    </Link>
  );
}
