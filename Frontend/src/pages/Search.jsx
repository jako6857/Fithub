import { useEffect, useMemo, useState } from "react";
import TopBar from "../components/layout/TopBar";
import ClassCard from "../components/class/ClassCard";
import InstructorCard from "../components/class/InstructorCard";
import { getAllTeams } from "../services/teams";
import { attachRatingsToTeams } from "../services/ratings";
import { useAuth } from "../context/AuthContext";
import { filterClasses } from "../utils/filterClasses";
import styles from "./Search.module.scss";

export default function Search() {
  const [allClasses, setAllClasses] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getAllTeams()
      .then(async (data) => {
        const withRatings = await attachRatingsToTeams(data ?? [], user?.id);
        setAllClasses(withRatings);
      })
      .catch((err) => setError(err.message));
  }, [user]);

  const results = useMemo(() => {
    if (!allClasses) return null;
    return filterClasses(allClasses, query);
  }, [allClasses, query]);

  const isSearching = query.trim().length > 0;
  const popularTrainers = allClasses
    ? [
        ...new Map(
          allClasses
            .map((classItem) => classItem.instructor)
            .filter(Boolean)
            .map((trainer) => [trainer.id, trainer]),
        ).values(),
      ].slice(0, 3)
    : [];

  return (
    <div className="app-shell">
      <TopBar showBack title="Search" />

      <div className={styles.searchBox}>
        <label htmlFor="class-search" className="visually-hidden">
          Enter keyword and press enter
        </label>
        <input
          id="class-search"
          type="search"
          placeholder="Search classes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {error && (
        <p className="status-message status-message--error" role="alert">
          {error}
        </p>
      )}

      {!allClasses && !error && (
        <div className={styles.skeletonGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`skeleton ${styles.skeletonCard}`} />
          ))}
        </div>
      )}

      {allClasses && (
        <>
          <h2 className={styles.sectionHeading}>
            {isSearching ? "Results" : "Popular classes"}
          </h2>

          {isSearching && results.length === 0 ? (
            <p className={styles.noResults}>
              Your search did not give any results. Try to search for something
              else.
            </p>
          ) : (
            <div className={styles.grid}>
              {results.map((c) => (
                <ClassCard key={c.id} classItem={c} />
              ))}
            </div>
          )}

          {!isSearching && (
            <>
              <h2 className={styles.sectionHeading}>Popular trainers</h2>
              {allClasses === null ? (
                <div className={styles.trainerList}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`skeleton ${styles.skeletonTrainer}`}
                    />
                  ))}
                </div>
              ) : popularTrainers.length === 0 ? (
                <p className={styles.noResults}>No trainers to show yet.</p>
              ) : (
                <div className={styles.trainerList}>
                  {popularTrainers.map((t) => (
                    <InstructorCard key={t.id} instructor={t} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
