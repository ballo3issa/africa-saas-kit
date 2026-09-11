"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StudeoIcon } from "@/components/studeo-icon";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { authClient } from "@/lib/auth/client";
import { loginSchema, registerSchema } from "@/lib/validation/auth";
import styles from "@/components/auth-page.module.css";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className={styles.googleIcon} viewBox="0 0 48 48">
      <path d="M47.53 24.56c0-1.64-.15-3.22-.42-4.74H24v8.97h13.2a11.3 11.3 0 0 1-4.9 7.4v6.16h7.94c4.64-4.27 7.29-10.56 7.29-17.79Z" fill="#4285F4" />
      <path d="M24 48c6.63 0 12.19-2.2 16.24-5.95l-7.94-6.16c-2.2 1.47-5.01 2.34-8.3 2.34-6.38 0-11.78-4.31-13.72-10.1H2.07v6.36A24 24 0 0 0 24 48Z" fill="#34A853" />
      <path d="M10.28 28.13A14.4 14.4 0 0 1 9.5 24c0-1.43.25-2.82.68-4.13v-6.36H2.07A24 24 0 0 0 0 24c0 3.87.93 7.53 2.07 10.49l8.21-6.36Z" fill="#FBBC05" />
      <path d="M24 9.5c3.6 0 6.83 1.24 9.37 3.67l7.02-7.02C36.19 2.2 30.63 0 24 0A24 24 0 0 0 2.07 13.51l8.21 6.36C12.22 13.81 17.62 9.5 24 9.5Z" fill="#EA4335" />
    </svg>
  );
}

function validationMessage(path: PropertyKey | undefined) {
  if (path === "name") return "Veuillez saisir un nom d’au moins 2 caractères.";
  if (path === "password") return "Le mot de passe doit contenir au moins 10 caractères.";
  return "Veuillez saisir une adresse email valide.";
}

type AuthField = "name" | "email" | "password";
type FieldErrors = Partial<Record<AuthField, string>>;

function isAuthField(value: PropertyKey | undefined): value is AuthField {
  return value === "name" || value === "email" || value === "password";
}

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isLogin = mode === "login";
  const captchaEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  const emailId = `${mode}-email`;
  const passwordId = `${mode}-password`;
  const toastId = useRef(0);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => {
      setToast((current) => (current?.id === toast.id ? null : current));
    }, 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function showError(message: string) {
    toastId.current += 1;
    setToast({ id: toastId.current, message });
  }

  function clearFieldError(field: AuthField) {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setFieldErrors({});

    if (captchaEnabled && !captchaToken) {
      showError("Veuillez terminer la vérification anti-bot.");
      setBusy(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const raw = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
    };
    const validated = (isLogin ? loginSchema : registerSchema).safeParse(raw);

    if (!validated.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of validated.error.issues) {
        const field = issue.path[0];
        if (isAuthField(field) && !nextErrors[field]) {
          nextErrors[field] = validationMessage(field);
        }
      }
      const fieldOrder: AuthField[] = isLogin
        ? ["email", "password"]
        : ["name", "email", "password"];
      const firstField = fieldOrder.find((field) => Boolean(nextErrors[field]));
      const message = validationMessage(firstField);
      setFieldErrors(nextErrors);
      showError(message);
      if (isAuthField(firstField)) {
        const control = event.currentTarget.elements.namedItem(firstField);
        if (control instanceof HTMLElement) control.focus();
      }
      setBusy(false);
      return;
    }

    try {
      const { email, password } = validated.data;
      const fetchOptions = captchaToken
        ? { headers: { "x-captcha-response": captchaToken } }
        : undefined;

      if (isLogin) {
        const result = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/dashboard",
          fetchOptions,
        });
        if (result.error) {
          showError(result.error.message || "Connexion impossible");
          setBusy(false);
          return;
        }
        if ((result.data as { twoFactorRedirect?: boolean } | null)?.twoFactorRedirect) {
          router.push("/two-factor");
          return;
        }
      } else {
        const name =
          "name" in validated.data && typeof validated.data.name === "string"
            ? validated.data.name
            : "";
        const result = await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL: "/dashboard",
          fetchOptions,
        });
        if (result.error) {
          showError(result.error.message || "Inscription impossible");
          setBusy(false);
          return;
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      showError(
        isLogin
          ? "Connexion momentanément indisponible."
          : "Inscription momentanément indisponible.",
      );
      setBusy(false);
    }
  }

  async function googleSignIn() {
    setBusy(true);
    setFieldErrors({});
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (result?.error) {
        showError(result.error.message || "Connexion Google impossible");
        setBusy(false);
      }
    } catch {
      showError("Connexion Google momentanément indisponible.");
      setBusy(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      {toast ? (
        <div className={styles.toast} role="alert" aria-live="assertive">
          <span className={styles.toastIcon}><StudeoIcon name="alert" size={18} /></span>
          <span className={styles.toastMessage}>{toast.message}</span>
          <button
            aria-label="Fermer la notification"
            className={styles.toastClose}
            type="button"
            onClick={() => setToast(null)}
          >
            <StudeoIcon name="close" size={17} />
          </button>
        </div>
      ) : null}
      {googleEnabled ? (
        <>
          <button
            className={styles.googleButton}
            type="button"
            disabled={busy}
            onClick={googleSignIn}
          >
            <GoogleIcon />
            Continuer avec Google
          </button>
          <div className={styles.divider}>ou par email</div>
        </>
      ) : null}

      {!isLogin ? (
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor={`${mode}-name`}>Nom complet</label>
          <span className={styles.inputFrame} data-invalid={Boolean(fieldErrors.name)}>
            <StudeoIcon name="user" size={18} />
            <input aria-describedby={fieldErrors.name ? `${mode}-name-error` : undefined} aria-invalid={Boolean(fieldErrors.name)} autoComplete="name" className={styles.input} id={`${mode}-name`} maxLength={120} minLength={2} name="name" onChange={() => clearFieldError("name")} placeholder="Votre nom" required />
          </span>
          {fieldErrors.name ? <p className={styles.fieldError} id={`${mode}-name-error`}>{fieldErrors.name}</p> : null}
        </div>
      ) : null}

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={emailId}>Adresse email</label>
        <span className={styles.inputFrame} data-invalid={Boolean(fieldErrors.email)}>
          <StudeoIcon name="mail" size={18} />
          <input aria-describedby={fieldErrors.email ? `${emailId}-error` : undefined} aria-invalid={Boolean(fieldErrors.email)} autoCapitalize="none" autoComplete="email" className={styles.input} id={emailId} inputMode="email" maxLength={254} name="email" onChange={() => clearFieldError("email")} placeholder="vous@example.com" required spellCheck={false} type="email" />
        </span>
        {fieldErrors.email ? <p className={styles.fieldError} id={`${emailId}-error`}>{fieldErrors.email}</p> : null}
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={passwordId}>Mot de passe</label>
        <span className={styles.inputFrame} data-invalid={Boolean(fieldErrors.password)}>
          <StudeoIcon name="lock" size={18} />
          <input aria-describedby={fieldErrors.password ? `${passwordId}-error` : undefined} aria-invalid={Boolean(fieldErrors.password)} autoComplete={isLogin ? "current-password" : "new-password"} className={styles.input} id={passwordId} maxLength={256} minLength={10} name="password" onChange={() => clearFieldError("password")} placeholder={isLogin ? "Votre mot de passe" : "10 caractères minimum"} required type={passwordVisible ? "text" : "password"} />
          <button aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={passwordVisible} className={styles.revealButton} type="button" onClick={() => setPasswordVisible((visible) => !visible)}>
            <StudeoIcon name={passwordVisible ? "eye-off" : "eye"} size={18} />
          </button>
        </span>
        {fieldErrors.password ? <p className={styles.fieldError} id={`${passwordId}-error`}>{fieldErrors.password}</p> : null}
      </div>

      {isLogin ? (
        <div className={styles.forgotRow}>
          <Link className={styles.forgotLink} href="/forgot-password">Mot de passe oublié ?</Link>
        </div>
      ) : null}

      <TurnstileWidget onToken={setCaptchaToken} />

      <button className={styles.primaryButton} disabled={busy} type="submit">
        {busy ? "Traitement…" : isLogin ? "Se connecter" : "Créer mon compte"}
      </button>

      <p className={styles.legal}>
        En continuant, vous acceptez nos <span className={styles.legalLabel}>CGU</span> et notre{" "}
        <span className={styles.legalLabel}>Politique de confidentialité</span>.
      </p>
    </form>
  );
}
