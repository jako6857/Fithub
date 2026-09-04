import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import ClassHero from "../components/class/ClassHero";
import InstructorCard from "../components/class/InstructorCard";
import EnrollButton from "../components/class/EnrollButton";
import RatingStars from "../components/rating/RatingStars";
import { useAuth } from "../context/AuthContext";
import { getTeamById } from "../services/teams";
import {
  getMySchedule,
  createBooking,
  deleteBooking,
} from "../services/bookings";
import { getRatingsSummary, createRating } from "../services/ratings";
import styles from "./ClassDetails.module.scss";

export default function ClassDetails() {
  const { classId } = useParams();
  const { isLoggedIn, user } = useAuth();
  const [classItem, setClassItem] = useState(null);
  const [ratingSummary, setRatingSummary] = useState({
    average: 0,
    count: 0,
    userRating: undefined,
  });
  const [schedule, setSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const loadClass = useCallback(() => {
    setError(null);
    setNotFound(false);
    getTeamById(classId)
      .then(setClassItem)
      .catch((err) => {
        if (err.status === 404) setNotFound(true);
        else setError(err.message);
      });
  }, [classId]);

  const loadRatings = useCallback(() => {
    getRatingsSummary(classId, user?.id)
      .then(setRatingSummary)
      .catch(() => {});
  }, [classId, user]);

  const loadSchedule = useCallback(() => {
    if (!isLoggedIn) {
      setSchedule([]);
      return;
    }
    getMySchedule()
      .then(setSchedule)
      .catch(() => setSchedule([]));
  }, [isLoggedIn]);

  useEffect(() => {
    setClassItem(null);
    loadClass();
    loadRatings();
  }, [loadClass, loadRatings]);

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const currentBooking = schedule?.find((s) => s.team?.id === Number(classId));
  const dayConflict = schedule?.find(
    (s) =>
      s.team?.weekday === classItem?.weekday && s.team?.id !== Number(classId),
  );

  async function handleEnroll(teamId) {
    await createBooking(teamId);
    loadSchedule();
  }

  async function handleLeave() {
    if (!currentBooking) return;
    await deleteBooking(currentBooking.bookingId);
    loadSchedule();
  }

  async function handleRate(value) {
    await createRating({ teamId: classId, numStars: value });
    loadRatings();
  }

  if (notFound) {
    return (
      <div className="app-shell">
        <TopBar showBack title="Class Details" />
        <p className={styles.messagePad}>This class doesn't exist anymore.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-shell">
        <TopBar showBack title="Class Details" />
        <p
          className={`status-message status-message--error ${styles.messagePad}`}
          role="alert"
        >
          {error}
        </p>
      </div>
    );
  }

  if (!classItem) {
    return (
      <div className="app-shell">
        <TopBar overlay />
        <div className={`skeleton ${styles.heroSkeleton}`} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <TopBar overlay />
      <ClassHero
        image={classItem.image}
        name={classItem.name}
        action={
          isLoggedIn && (
            <EnrollButton
              classItem={classItem}
              isEnrolled={!!currentBooking}
              isDayTaken={!!dayConflict}
              onEnroll={handleEnroll}
              onLeave={handleLeave}
            />
          )
        }
      />

      <div className={styles.body}>
        <RatingStars
          average={ratingSummary.average}
          count={ratingSummary.count}
          interactive={isLoggedIn}
          hasRated={ratingSummary.userRating !== undefined}
          onRate={handleRate}
        />

        <h3 className={styles.sectionHeading}>Schedule</h3>
        <div className={styles.scheduleRow}>
          <span>{classItem.weekday}</span>
          <span>{classItem.time}</span>
        </div>
        <p className={styles.description}>{classItem.description}</p>

        <h3 className={styles.sectionHeading}>Trainer</h3>
        <InstructorCard instructor={classItem.instructor} />
      </div>
    </div>
  );
}
