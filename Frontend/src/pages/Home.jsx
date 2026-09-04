import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import ClassHero from "../components/class/ClassHero";
import ClassSwipeList from "../components/class/ClassSwipeList";
import { getAllTeams } from "../services/teams";
import { attachRatingsToTeams } from "../services/ratings";
import { useAuth } from "../context/AuthContext";
import styles from "./Home.module.scss";

export default function Home() {
  const [classes, setClasses] = useState(null);
  const [featured, setFeatured] = useState(null);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    getAllTeams()
      .then(async (data) => {
        const list = data ?? [];
        const withRatings = await attachRatingsToTeams(list, user?.id);
        if (!active) return;
        setClasses(withRatings);
        if (withRatings.length > 0) {
          setFeatured(
            withRatings[Math.floor(Math.random() * withRatings.length)],
          );
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      });
    return () => {
      active = false;
    };
  }, [user]);

  return (
    <div className="app-shell">
      <TopBar
        title="Popular Classes"
        showBack
        backPath="/"
        backDirection="up"
      />

      {error && (
        <div className={styles.errorWrap}>
          <p className="status-message status-message--error" role="alert">
            Couldn't load classes: {error}
          </p>
        </div>
      )}

      {featured ? (
        <div
          className={styles.heroFrame}
          onClick={() => navigate(`/class/${featured.id}`)}
          role="button"
          tabIndex={0}
        >
          <ClassHero image={featured.image} name={featured.name} />
        </div>
      ) : (
        <div className={styles.heroFrame}>
          <div className={`skeleton ${styles.heroSkeleton}`} />
        </div>
      )}

      <section className={styles.listSection}>
        <h2>Classes for you</h2>
        {classes ? (
          <ClassSwipeList classes={classes} compact />
        ) : (
          <div className={styles.skeletonRow}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={`skeleton ${styles.skeletonCard}`} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
