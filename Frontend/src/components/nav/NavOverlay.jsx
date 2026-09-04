import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavOverlay } from "../../context/NavOverlayContext";
import styles from "./NavOverlay.module.scss";

export default function NavOverlay() {
  const { isOpen, close } = useNavOverlay();
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  function go(path) {
    close();
    navigate(path);
  }

  function validate() {
    const errs = {};
    if (!credentials.email.trim()) errs.email = "Enter your username.";
    if (!credentials.password) errs.password = "Enter your password.";
    return errs;
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setFormError(null);
    try {
      await login(credentials);
      setCredentials({ email: "", password: "" });
      go("/home");
    } catch (err) {
      setFormError(err.message || "Login failed. Check your details.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    logout();
    go("/home");
  }

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Navigation">
      <button type="button" className={styles.closeButton} onClick={close} aria-label="Luk menu">
        ×
      </button>

      <nav className={styles.nav}>
        <ul>
          <li>
            <button type="button" onClick={() => go("/home")}>
              Home
            </button>
          </li>
          <li>
            <button type="button" onClick={() => go("/search")}>
              Search
            </button>
          </li>
          {isLoggedIn && (
            <li>
              <button type="button" onClick={() => go("/schedule")}>
                My Schedule
              </button>
            </li>
          )}
          {isLoggedIn ? (
            <li>
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          ) : (
            <li>
              <span className={styles.navLabel}>Log in</span>
            </li>
          )}
        </ul>
      </nav>

      {!isLoggedIn && (
        <form className={styles.loginForm} onSubmit={handleLoginSubmit} noValidate>
          {formError && (
            <p className="status-message status-message--error" role="alert">
              {formError}
            </p>
          )}

          <label htmlFor="nav-username" className="visually-hidden">
            Username
          </label>
          <input
            id="nav-username"
            type="text"
            placeholder="Username"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}

          <label htmlFor="nav-password" className="visually-hidden">
            Password
          </label>
          <input
            id="nav-password"
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            aria-invalid={!!fieldErrors.password}
          />
          {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}

          <button type="submit" className={styles.loginButton} disabled={submitting}>
            {submitting ? "Logging in…" : "Login"}
          </button>

          <button type="button" className={styles.signupLink} onClick={() => go("/signup")}>
            New here? Create an account
          </button>
        </form>
      )}
    </div>
  );
}
