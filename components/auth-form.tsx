"use client";

import { FormEvent, useState } from "react";
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

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isLogin = mode === "login";
  const captchaEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";
  const emailId = `${mode}-email`;
  const passwordId = `${mode}-password`;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    if (captchaEnabled && !captchaToken) {
      setError("Veuillez terminer la vérification anti-bot.");
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
      setError(validationMessage(validated.error.issues[0]?.path[0]));
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
          setError(result.error.message || "Connexion impossible");
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
          setError(result.error.message || "Inscription impossible");
          setBusy(false);
          return;
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(
        isLogin
          ? "Connexion momentanément indisponible."
          : "Inscription momentanément indisponible.",
      );
      setBusy(false);
    }
  }

  async function googleSignIn() {
    setBusy(true);
    setError("");
    try {
      const result = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
      if (result?.error) {
        setError(result.error.message || "Connexion Google impossible");
        setBusy(false);
      }
    } catch {
      setError("Connexion Google momentanément indisponible.");
      setBusy(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={submit} noValidate>
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
          <span className={styles.inputFrame}>
            <StudeoIcon name="user" size={18} />
            <input autoComplete="name" className={styles.input} id={`${mode}-name`} maxLength={120} minLength={2} name="name" placeholder="Votre nom" required />
          </span>
        </div>
      ) : null}

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={emailId}>Adresse email</label>
        <span className={styles.inputFrame}>
          <StudeoIcon name="mail" size={18} />
          <input autoCapitalize="none" autoComplete="email" className={styles.input} id={emailId} inputMode="email" maxLength={254} name="email" placeholder="vous@example.com" required spellCheck={false} type="email" />
        </span>
      </div>

      <div className={styles.field}>
        <label className={styles.fieldLabel} htmlFor={passwordId}>Mot de passe</label>
        <span className={styles.inputFrame}>
          <StudeoIcon name="lock" size={18} />
          <input autoComplete={isLogin ? "current-password" : "new-password"} className={styles.input} id={passwordId} maxLength={256} minLength={10} name="password" placeholder={isLogin ? "Votre mot de passe" : "10 caractères minimum"} required type={passwordVisible ? "text" : "password"} />
          <button aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"} aria-pressed={passwordVisible} className={styles.revealButton} type="button" onClick={() => setPasswordVisible((visible) => !visible)}>
            <StudeoIcon name={passwordVisible ? "eye-off" : "eye"} size={18} />
          </button>
        </span>
      </div>

      {isLogin ? (
        <div className={styles.forgotRow}>
          <Link className={styles.forgotLink} href="/forgot-password">Mot de passe oublié ?</Link>
        </div>
      ) : null}

      <TurnstileWidget onToken={setCaptchaToken} />

      {error ? <p className={styles.error} role="alert" aria-live="polite">{error}</p> : null}

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
