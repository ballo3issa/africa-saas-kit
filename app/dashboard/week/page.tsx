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

const days = [
  ["Lun", "16"],
  ["Mar", "17"],
  ["Mer", "18"],
  ["Jeu", "19"],
  ["Ven", "20"],
  ["Sam", "21"],
  ["Dim", "22"],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/week"
      eyebrow="Planning"
      title="Ma semaine"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-week-strip" aria-label="Jours de la semaine">
        {days.map(([day, date], index) => (
          <button
            type="button"
            className={`studeo-day ${index === 2 ? "is-active" : ""}`}
            key={day}
          >
            <span>{day}</span>
            <strong>{date}</strong>
          </button>
        ))}
      </div>
      <div className="studeo-dashboard-grid">
        <div>
          <SectionTitle
            action={<Link href="/dashboard/create/event">Ajouter</Link>}
          >
            Mercredi 18 septembre
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
          <SectionTitle>À préparer</SectionTitle>
          <div className="studeo-panel">
            <TaskItem>Réviser l&apos;anglais</TaskItem>
            <TaskItem>Exercices de maths</TaskItem>
            <TaskItem badge="Vendredi">Préparation présentation</TaskItem>
          </div>
        </div>
        <div>
          <SectionTitle>Prochaine échéance</SectionTitle>
          <NoticeBanner
            title="Contrôle de géographie"
            detail="Vendredi · Salle 203"
          />
          <SectionTitle>Cette semaine</SectionTitle>
          <div className="studeo-stats">
            <div className="studeo-stat">
              <span>Cours</span>
              <strong>12</strong>
            </div>
            <div className="studeo-stat">
              <span>Devoirs</span>
              <strong>4</strong>
            </div>
            <div className="studeo-stat">
              <span>Révisions</span>
              <strong>3</strong>
            </div>
            <div className="studeo-stat">
              <span>Étudié</span>
              <strong>2h30</strong>
            </div>
          </div>
        </div>
      </div>
    </StudeoShell>
  );
}
