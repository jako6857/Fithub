import { useNavigate } from "react-router-dom";
import cover1 from "../assets/cover1.jpg";
import cover2 from "../assets/cover2.jpg";
import styles from "./Welcome.module.scss";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className={styles.welcome}>
      <div
        className={styles.topImage}
        style={{ backgroundImage: `url(${cover2})` }}
      >
        <div className={styles.headline}>
          <h1>
            Believe
            <br />
            Yourself
          </h1>
          <div className={styles.taglineRow}>
            <span className={styles.taglineBar} />
            <p>Train like a pro</p>
          </div>
        </div>
      </div>

      <div
        className={styles.bottomImage}
        style={{ backgroundImage: `url(${cover1})` }}
      >
        <button
          type="button"
          className={styles.startButton}
          onClick={() => navigate("/home")}
        >
          Start training
        </button>
      </div>
    </div>
  );
}
