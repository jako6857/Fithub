import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import { deleteBooking, getMySchedule } from "../services/bookings";
import styles from "./MySchedule.module.scss";

export default function MySchedule() {
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  useEffect(() => {
    getMySchedule()
      .then(setSchedule)
      .catch((err) => setError(err.message));
  }, []);

  async function handleCancel(bookingId) {
    setCancelingId(bookingId);
    setError(null);
    try {
      await deleteBooking(bookingId);
      setSchedule(
        (current) =>
          current?.filter((item) => item.bookingId !== bookingId) ?? [],
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setCancelingId(null);
    }
  }

  return (
    <div className="app-shell">
      <TopBar showBack title="My Schedule" />

      <div className={styles.body}>
        {error && (
          <p className="status-message status-message--error" role="alert">
            {error}
          </p>
        )}

        {!schedule && !error && (
          <div className={styles.skeletonList}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`skeleton ${styles.skeletonRow}`} />
            ))}
          </div>
        )}

        {schedule && schedule.length === 0 && (
          <p className={styles.empty}>
            You haven't signed up for any classes yet.{" "}
            <Link to="/home">Browse classes</Link>.
          </p>
        )}

        {schedule && schedule.length > 0 && (
          <ul className={styles.list}>
            {schedule.map(({ bookingId, team }) => (
              <li key={bookingId}>
                <div className={styles.row}>
                  <Link to={`/class/${team.id}`} className={styles.details}>
                    <p className={styles.weekday}>{team.weekday}</p>
                    <p className={styles.name}>{team.name}</p>
                    <span className={styles.time}>{team.time}</span>
                  </Link>
                  <button
                    type="button"
                    className="btn btn--danger"
                    onClick={() => handleCancel(bookingId)}
                    disabled={cancelingId === bookingId}
                  >
                    {cancelingId === bookingId ? "Cancelling..." : "Cancel"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
