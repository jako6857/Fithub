import { useNavigate } from "react-router-dom";
import { useNavOverlay } from "../../context/NavOverlayContext";
import styles from "./TopBar.module.scss";

function BackIcon({ direction }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {direction === "up" ? (
        <path d="m5 12 7-7 7 7M12 5v14" />
      ) : (
        <path d="m15 18-6-6 6-6" />
      )}
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export default function TopBar({
  title,
  showBack = false,
  overlay = false,
  backPath = "/home",
  backDirection = "left",
}) {
  const navigate = useNavigate();
  const { open } = useNavOverlay();

  return (
    <div className={`${styles.bar} ${overlay ? styles.overlay : ""}`}>
      {showBack ? (
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => navigate(backPath)}
          aria-label="Tilbage"
        >
          <BackIcon direction={backDirection} />
        </button>
      ) : (
        <span className={styles.spacer} />
      )}

      {title && <h1 className={styles.title}>{title}</h1>}

      <button
        type="button"
        className={styles.iconButton}
        onClick={open}
        aria-label="Åbn menu"
      >
        <MenuIcon />
      </button>
    </div>
  );
}
