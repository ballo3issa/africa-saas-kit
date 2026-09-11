import { requireUser } from "@/lib/auth/session";
import {
  DemoBadge,
  SectionTitle,
  StudeoShell,
} from "@/components/studeo-shell";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";

const notifications: Array<[StudeoIconName, string, string, string]> = [
  [
    "alert",
    "Rappel : Contrôle de maths demain",
    "Pensez à réviser le chapitre sur les intégrales",
    "Il y a 30 min",
  ],
  [
    "message",
    "Nouveau message de Sarah M.",
    "Je t'envoie les notes du cours",
    "Il y a 2h",
  ],
  ["check", "Objectif atteint !", "Vous avez étudié 5h cette semaine", "Hier"],
  [
    "clipboard",
    "Devoir Français à rendre",
    "Date limite : 20 septembre",
    "Mar 16 sept",
  ],
  [
    "book",
    "Suggestion de révision",
    "Vous progressez bien en anglais, continuez !",
    "Lun 15 sept",
  ],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/notifications"
      eyebrow="Rappels et activité"
      title="Notifications"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-filter-row">
        <button type="button" className="is-active">
          Toutes
        </button>
        <button type="button">Non lues</button>
        <button type="button">Rappels</button>
        <button type="button">Messages</button>
      </div>
      <SectionTitle>Récentes</SectionTitle>
      <div className="studeo-panel studeo-list">
        {notifications.map(([icon, title, detail, time]) => (
          <article className="studeo-list-row" key={title}>
            <span className="studeo-list-icon">
              <StudeoIcon name={icon} size={18} />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
            <time>{time}</time>
          </article>
        ))}
      </div>
    </StudeoShell>
  );
}
