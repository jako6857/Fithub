import { getUserDisplayName, getUserAvatar } from "../../utils/userDisplay";
import styles from "./InstructorCard.module.scss";

export default function InstructorCard({ instructor }) {
  if (!instructor) return null;

  return (
    <div className={styles.card}>
      <img src={getUserAvatar(instructor)} alt={getUserDisplayName(instructor)} className={styles.photo} />
      <div>
        <p className={styles.name}>{getUserDisplayName(instructor)}</p>
        {instructor.description && <p className={styles.bio}>{instructor.description}</p>}
      </div>
    </div>
  );
}
