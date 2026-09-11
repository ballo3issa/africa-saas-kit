import Link from "next/link";
import { AuthForm } from "@/components/auth-form";
import { StudeoIcon } from "@/components/studeo-icon";
import styles from "@/components/auth-page.module.css";

const benefits = [
  "Emploi du temps et cours organisés",
  "Rappels avant chaque contrôle",
  "Révisions minutées et suivies",
];

export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";

  return (
    <main className={styles.page}>
      <aside className={styles.brandPanel} aria-label="Présentation d’Etudeo">
        <span className={styles.orbTop} />
        <span className={styles.orbBottom} />

        <Link className={styles.brandLink} href="/" aria-label="Retour à l’accueil Etudeo">
          <span className={styles.brandMark}>
            <StudeoIcon name="graduation" size={20} />
          </span>
          Etudeo
        </Link>

        <p className={styles.mobilePromise}>
          Organisez vos cours, planifiez vos révisions et avancez sereinement.
        </p>

        <div className={styles.brandContent}>
          <div className={styles.eyebrow}>
            <StudeoIcon name="graduation" size={14} />
            La planification scolaire ivoirienne
          </div>
          <h2 className={styles.brandTitle}>
            Organisez vos cours.
            <br />
            Révisez mieux.
            <br />
            <span className={styles.brandTitleMuted}>Réussissez.</span>
          </h2>
          <p className={styles.brandDescription}>
            Centralisez votre emploi du temps, vos tâches et vos séances de révision dans un
            espace simple, conçu pour garder le cap.
          </p>
          <div className={styles.benefits}>
            {benefits.map((benefit) => (
              <div className={styles.benefit} key={benefit}>
                <span className={styles.benefitIcon}>
                  <StudeoIcon name="check" size={12} />
                </span>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.proof}>
          <p className={styles.proofText}>
            “Etudeo m’aide à voir clairement ce que je dois apprendre et à mieux répartir mes
            révisions dans la semaine.”
          </p>
          <div className={styles.person}>
            <span className={styles.avatar}>A</span>
            <div>
              <p className={styles.personName}>Élève à Abidjan</p>
              <p className={styles.personMeta}>Organisation scolaire</p>
            </div>
          </div>
        </div>
      </aside>

      <section className={styles.formPanel} aria-labelledby={`${mode}-title`}>
        <div className={styles.formContainer}>
          <h1 className={styles.heading} id={`${mode}-title`}>
            {isLogin ? "Bon retour 👋" : "Créer votre compte"}
          </h1>
          <p className={styles.switchPrompt}>
            {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"}{" "}
            <Link className={styles.textLink} href={isLogin ? "/register" : "/login"}>
              {isLogin ? "S’inscrire gratuitement" : "Se connecter"}
            </Link>
          </p>
          <AuthForm mode={mode} />
        </div>
      </section>
    </main>
  );
}
