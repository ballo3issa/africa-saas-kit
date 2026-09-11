import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import {
  CourseCard,
  DemoBadge,
  NoticeBanner,
  SectionTitle,
  StudeoShell,
  TaskItem,
} from "@/components/studeo-shell";
import { StudeoIcon } from "@/components/studeo-icon";

export default async function Page() {
  const session = await requireUser();
  const firstName = session.user.name?.split(" ")[0] || "Étudiant";
  const today = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Africa/Abidjan",
  }).format(new Date());

  return (
    <StudeoShell
      active="/dashboard"
      eyebrow={capitalize(today)}
      title={`Bonjour, ${firstName}`}
      userName={session.user.name || firstName}
      headerAction={
        <>
          <label className="studeo-header-search">
            <span className="sr-only">Rechercher dans votre espace</span>
            <StudeoIcon name="search" size={17} />
            <input type="search" placeholder="Rechercher…" />
          </label>
          <DemoBadge />
        </>
      }
    >
      <div className="studeo-dashboard-grid">
        <div>
          <section
            className="studeo-hero-card"
            aria-labelledby="next-course-title"
          >
            <div>
              <p>Prochain cours</p>
              <h2 id="next-course-title">Mathématiques</h2>
            </div>
            <div className="studeo-hero-meta">
              <span>08:30 – 09:30</span>
              <span>Dans 25 min</span>
              <span>Salle 204</span>
            </div>
          </section>

          <SectionTitle action={<Link href="/dashboard/week">Voir tout</Link>}>
            Cours du jour
          </SectionTitle>
          <div className="studeo-course-list">
            <CourseCard
              subject="Mathématiques"
              time="08:30 – 09:30"
              room="Salle 204"
              featured
            />
            <CourseCard
              subject="Français"
              time="10:00 – 11:00"
              room="Salle 105"
              tone="orange"
            />
            <CourseCard
              subject="Physique"
              time="14:00 – 15:00"
              room="Labo"
              tone="violet"
            />
          </div>
        </div>

        <div>
          <SectionTitle
            action={<Link href="/dashboard/create/task">Ajouter</Link>}
          >
            À faire aujourd&apos;hui
          </SectionTitle>
          <div className="studeo-panel">
            <TaskItem>Exercices de mathématiques</TaskItem>
            <TaskItem badge="Urgent">Réviser l&apos;anglais</TaskItem>
            <TaskItem done>Lire le chapitre d&apos;histoire</TaskItem>
          </div>

          <SectionTitle>Ta journée</SectionTitle>
          <div className="studeo-panel">
            <div className="studeo-progress-head">
              <strong>Progression</strong>
              <p>3/5 tâches</p>
            </div>
            <div
              className="studeo-progress-track"
              aria-label="60 % des tâches terminées"
            >
              <span />
            </div>
            <p className="studeo-progress-copy">
              Encore 2 tâches, tu y es presque.
            </p>
          </div>

          <SectionTitle>Échéance</SectionTitle>
          <NoticeBanner
            title="Contrôle de mathématiques"
            detail="Vendredi · Chapitre sur les intégrales"
          />
        </div>
      </div>
    </StudeoShell>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
