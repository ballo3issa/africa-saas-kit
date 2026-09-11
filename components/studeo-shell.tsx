import Link from "next/link";
import type { ReactNode } from "react";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";

const navItems: Array<{
  href: string;
  icon: StudeoIconName;
  label: string;
}> = [
  { href: "/dashboard", icon: "sun", label: "Aujourd'hui" },
  { href: "/dashboard/week", icon: "calendar", label: "Semaine" },
  { href: "/dashboard/study", icon: "timer", label: "Étudier" },
  { href: "/dashboard/messages", icon: "message", label: "Messages" },
  { href: "/dashboard/history", icon: "history", label: "Historique" },
  { href: "/dashboard/notifications", icon: "bell", label: "Notifications" },
  { href: "/dashboard/more", icon: "user", label: "Profil et plus" },
];

type StudeoShellProps = {
  active: string;
  eyebrow: string;
  title: string;
  userName: string;
  children: ReactNode;
  headerAction?: ReactNode;
};

export function StudeoShell({
  active,
  eyebrow,
  title,
  userName,
  children,
  headerAction,
}: StudeoShellProps) {
  const firstName = userName.trim().split(/\s+/)[0] || "Amadou";

  return (
    <div className="studeo-app">
      <aside className="studeo-sidebar" aria-label="Navigation principale">
        <Link className="studeo-brand" href="/dashboard">
          <span className="studeo-brand-mark" aria-hidden="true">
            <StudeoIcon name="graduation" size={20} />
          </span>
          <span>Etudeo</span>
        </Link>
        <Link className="studeo-create-button" href="/dashboard/create">
          <StudeoIcon name="plus" size={17} /> Créer
        </Link>
        <nav className="studeo-side-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={active === item.href ? "is-active" : undefined}
              aria-current={active === item.href ? "page" : undefined}
            >
              <span aria-hidden="true">
                <StudeoIcon name={item.icon} size={18} />
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="studeo-user-card">
          <span className="studeo-avatar" aria-hidden="true">
            {firstName.charAt(0).toUpperCase()}
          </span>
          <span>
            <strong>{firstName}</strong>
            <small>Mon espace</small>
          </span>
          <Link href="/dashboard/security" aria-label="Paramètres de sécurité">
            <StudeoIcon name="settings" size={17} />
          </Link>
        </div>
      </aside>
      <div className="studeo-main">
        <header className="studeo-topbar">
          <div>
            <p>{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="studeo-header-action">{headerAction}</div>
        </header>
        <main className="studeo-content">{children}</main>
      </div>
    </div>
  );
}

export function SectionTitle({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="studeo-section-title">
      <h2>{children}</h2>
      {action}
    </div>
  );
}

export function CourseCard({
  subject,
  time,
  room,
  tone = "blue",
  featured = false,
}: {
  subject: string;
  time: string;
  room?: string;
  tone?: "blue" | "orange" | "violet" | "green" | "rose";
  featured?: boolean;
}) {
  return (
    <article
      className={`studeo-course-card tone-${tone} ${featured ? "is-featured" : ""}`}
    >
      <span className="studeo-course-line" />
      <div>
        <strong>{subject}</strong>
        <p>
          {time}
          {room ? ` · ${room}` : ""}
        </p>
      </div>
    </article>
  );
}

export function TaskItem({
  children,
  done = false,
  badge,
}: {
  children: ReactNode;
  done?: boolean;
  badge?: string;
}) {
  return (
    <div className={`studeo-task ${done ? "is-done" : ""}`}>
      <span className="studeo-checkbox" aria-hidden="true">
        {done ? <StudeoIcon name="check" size={15} /> : null}
      </span>
      <span>{children}</span>
      {badge ? <small>{badge}</small> : null}
    </div>
  );
}

export function NoticeBanner({
  title,
  detail,
  tone = "warning",
}: {
  title: string;
  detail: string;
  tone?: "warning" | "success" | "info";
}) {
  return (
    <div className={`studeo-notice tone-${tone}`}>
      <span aria-hidden="true">
        <StudeoIcon name="alert" size={17} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
      </div>
      <span aria-hidden="true">
        <StudeoIcon name="chevron-right" size={17} />
      </span>
    </div>
  );
}

export function DemoBadge() {
  return <span className="studeo-demo-badge">Aperçu non persisté</span>;
}
