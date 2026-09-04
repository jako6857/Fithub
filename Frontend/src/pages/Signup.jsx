import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Signup.module.scss";

const emptyForm = { firstname: "", lastname: "", email: "", password: "", confirmPassword: "" };

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Signup() {
  const [form, setForm] = useState(emptyForm);
  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  function validate() {
    const errs = {};
    if (!form.firstname.trim()) errs.firstname = "First name is required.";
    if (!form.lastname.trim()) errs.lastname = "Last name is required.";
    if (!validateEmail(form.email)) errs.email = "Enter a valid email address.";
    if (!form.password || form.password.length < 8)
      errs.password = "Password must be at least 8 characters.";
    if (form.confirmPassword !== form.password) errs.confirmPassword = "Passwords don't match.";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setFormError(null);
    try {
      await signup({
        firstname: form.firstname.trim(),
        lastname: form.lastname.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/home");
    } catch (err) {
      setFormError(err.message || "Couldn't create account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="app-shell">
      <div className={styles.wrapper}>
        <button type="button" className={styles.back} onClick={() => navigate("/home")} aria-label="Back">
          ←
        </button>

        <h1>Create your account</h1>
        <p className={styles.subtitle}>Join and start booking classes.</p>

        {formError && (
          <p className="status-message status-message--error" role="alert">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.row2}>
            <div className="form-field">
              <label htmlFor="signup-firstname">First name</label>
              <input
                id="signup-firstname"
                value={form.firstname}
                onChange={(e) => setForm({ ...form, firstname: e.target.value })}
                aria-invalid={!!fieldErrors.firstname}
              />
              {fieldErrors.firstname && <span className="field-error">{fieldErrors.firstname}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="signup-lastname">Last name</label>
              <input
                id="signup-lastname"
                value={form.lastname}
                onChange={(e) => setForm({ ...form, lastname: e.target.value })}
                aria-invalid={!!fieldErrors.lastname}
              />
              {fieldErrors.lastname && <span className="field-error">{fieldErrors.lastname}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              aria-invalid={!!fieldErrors.password}
            />
            {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="signup-confirm">Confirm password</label>
            <input
              id="signup-confirm"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              aria-invalid={!!fieldErrors.confirmPassword}
            />
            {fieldErrors.confirmPassword && (
              <span className="field-error">{fieldErrors.confirmPassword}</span>
            )}
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}
