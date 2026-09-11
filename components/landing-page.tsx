import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { ScrollAwareHeader } from "@/components/scroll-aware-header";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";
import { siteConfig } from "@/lib/seo/site";
import styles from "./landing-page.module.css";

const features: Array<{
  icon: StudeoIconName;
  title: string;
  description: string;
}> = [
  {
    icon: "sun",
    title: "Vue du jour",
    description:
      "Retrouvez vos cours, vos tâches prioritaires et votre prochaine échéance au même endroit.",
  },
  {
    icon: "calendar",
    title: "Planning semaine",
    description:
      "Visualisez votre semaine scolaire et repérez rapidement les journées les plus chargées.",
  },
  {
    icon: "timer",
    title: "Séances de révision",
    description:
      "Préparez une séance par matière et choisissez une durée adaptée à votre objectif.",
  },
  {
    icon: "bell",
    title: "Rappels",
    description:
      "Gardez sous les yeux les contrôles, devoirs et événements qui approchent.",
  },
  {
    icon: "message",
    title: "Messages",
    description:
      "Centralisez vos échanges scolaires dans une interface claire et facile à consulter.",
  },
  {
    icon: "history",
    title: "Suivi de progression",
    description:
      "Consultez l’historique de vos séances pour mieux comprendre votre rythme d’étude.",
  },
];

const steps = [
  {
    number: "01",
    title: "Créez votre profil",
    description: "Commencez avec un espace personnel protégé.",
  },
  {
    number: "02",
    title: "Ajoutez votre planning",
    description: "Organisez vos cours, tâches et échéances importantes.",
  },
  {
    number: "03",
    title: "Avancez chaque jour",
    description: "Concentrez-vous sur la prochaine action utile.",
  },
];

const dailyCourses = [
  { subject: "Mathématiques", time: "08:30", next: true },
  { subject: "Français", time: "10:00", next: false },
  { subject: "Physique-Chimie", time: "14:00", next: false },
];

const productViews: Array<{
  icon: StudeoIconName;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    icon: "sun",
    eyebrow: "Aujourd’hui",
    title: "Une journée lisible",
    description:
      "Le prochain cours, les tâches prioritaires et les échéances restent visibles sans changer d’écran.",
  },
  {
    icon: "calendar",
    eyebrow: "Semaine",
    title: "Un planning cohérent",
    description:
      "Les cours et événements sont regroupés pour vous aider à anticiper votre charge de travail.",
  },
  {
    icon: "timer",
    eyebrow: "Étudier",
    title: "Des révisions cadrées",
    description:
      "Choisissez une matière et une durée, puis retrouvez vos séances dans votre historique.",
  },
];

function Brand() {
  return (
    <span className={styles.brand} aria-label="Etudeo, accueil">
      <span className={styles.brandMark}>
        <StudeoIcon name="graduation" size={19} />
      </span>
      <span>Etudeo</span>
    </span>
  );
}

export function LandingPage() {
  return (
    <main className={styles.page}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Web",
        }}
      />

      <ScrollAwareHeader className={styles.header}>
        <nav className={styles.nav} aria-label="Navigation principale">
          <a className={styles.brandLink} href="#accueil">
            <Brand />
          </a>
          <div className={styles.navLinks}>
            <a href="#fonctionnalites">Fonctionnalités</a>
            <a href="#fonctionnement">Comment ça marche</a>
            <a href="#apercus">Aperçus</a>
          </div>
          <div className={styles.navActions}>
            <Link className={styles.loginLink} href="/login">
              Connexion
            </Link>
            <Link className={styles.primaryButtonSmall} href="/register">
              Créer un compte
            </Link>
          </div>
        </nav>
      </ScrollAwareHeader>

      <section className={styles.hero} id="accueil">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              <StudeoIcon name="graduation" size={15} />
              La planification scolaire, simplement
            </p>
            <h1>Arrêtez de subir votre emploi du temps.</h1>
            <p className={styles.heroDescription}>
              Etudeo rassemble vos cours, devoirs, révisions et messages. Vous
              savez ce qui compte aujourd’hui et ce qui arrive ensuite.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/register">
                Démarrer gratuitement
                <StudeoIcon name="chevron-right" size={18} />
              </Link>
              <Link className={styles.secondaryButton} href="/login">
                J’ai déjà un compte
              </Link>
            </div>
            <ul
              className={styles.reassurance}
              aria-label="Avantages de l’inscription"
            >
              <li>
                <StudeoIcon name="check" size={16} /> Conçu pour les élèves
              </li>
              <li>
                <StudeoIcon name="check" size={16} /> Sans carte bancaire
              </li>
              <li>
                <StudeoIcon name="check" size={16} /> Accessible sur le Web
              </li>
            </ul>
          </div>

          <figure className={styles.productPreview}>
            <figcaption className={styles.previewTopbar}>
              <span>Aperçu d’une journée</span>
              <span className={styles.previewBadge}>Exemple</span>
            </figcaption>
            <div className={styles.previewGrid}>
              <div className={styles.scheduleCard}>
                <p className={styles.previewLabel}>Aujourd’hui — Mercredi</p>
                <h2>Bonjour, Camille</h2>
                <div className={styles.courseList}>
                  {dailyCourses.map((course) => (
                    <div className={styles.courseRow} key={course.subject}>
                      <span>
                        <strong>{course.subject}</strong>
                        <small>{course.time}</small>
                      </span>
                      {course.next ? (
                        <span className={styles.nextBadge}>Prochain cours</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.previewStats}>
                <div className={styles.statCard}>
                  <span>Progression</span>
                  <strong>3/5</strong>
                  <small>tâches du jour</small>
                </div>
                <div className={styles.statCard}>
                  <span>Prochain rendu</span>
                  <strong className={styles.warningText}>Vendredi</strong>
                  <small>Contrôle de maths</small>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section className={styles.featuresSection} id="fonctionnalites">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p>Fonctionnalités</p>
            <h2>Tout ce dont vous avez besoin, rien de superflu.</h2>
            <span>
              Une interface unique pour organiser la journée, préparer la
              semaine et suivre vos révisions.
            </span>
          </div>
          <div className={styles.featureGrid}>
            {features.map((feature) => (
              <article className={styles.featureCard} key={feature.title}>
                <span className={styles.iconBox}>
                  <StudeoIcon name={feature.icon} size={23} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.stepsSection} id="fonctionnement">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p>Comment ça marche</p>
            <h2>En route en trois étapes.</h2>
          </div>
          <ol className={styles.stepsList}>
            {steps.map((step) => (
              <li key={step.number}>
                <span className={styles.stepNumber}>{step.number}</span>
                <span className={styles.stepDot}>{Number(step.number)}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.productSection} id="apercus">
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeading}>
            <p>Aperçus</p>
            <h2>Votre organisation scolaire sous le même toit.</h2>
          </div>
          <div className={styles.productGrid}>
            {productViews.map((view) => (
              <article className={styles.productCard} key={view.title}>
                <span className={styles.productIcon}>
                  <StudeoIcon name={view.icon} size={22} />
                </span>
                <small>{view.eyebrow}</small>
                <h3>{view.title}</h3>
                <p>{view.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta}>
        <div className={styles.finalCtaInner}>
          <span className={styles.finalIcon}>
            <StudeoIcon name="graduation" size={26} />
          </span>
          <h2>Prêt à reprendre le contrôle de votre scolarité&nbsp;?</h2>
          <p>
            Créez votre espace Etudeo et commencez à organiser votre semaine.
          </p>
          <Link className={styles.primaryButton} href="/register">
            Créer mon compte
            <StudeoIcon name="chevron-right" size={18} />
          </Link>
          <span className={styles.finalNote}>
            Aucune carte bancaire demandée
          </span>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <Brand />
          <p>Organisez votre quotidien scolaire avec clarté.</p>
          <span>© 2026 Etudeo</span>
        </div>
      </footer>
    </main>
  );
}
