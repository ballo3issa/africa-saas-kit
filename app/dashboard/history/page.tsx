import { requireUser } from "@/lib/auth/session";
import {
  DemoBadge,
  SectionTitle,
  StudeoShell,
} from "@/components/studeo-shell";
import { StudeoIcon } from "@/components/studeo-icon";

const sessions = [
  ["Mathématiques", "45 min", "Aujourd'hui", "92%"],
  ["Français", "30 min", "Aujourd'hui", "86%"],
  ["Physique", "1h", "Hier", "89%"],
  ["Anglais", "30 min", "Hier", "94%"],
  ["Histoire", "45 min", "Mar 16 sept", "81%"],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/history"
      eyebrow="Vos performances"
      title="Historique"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-stats">
        <div className="studeo-stat">
          <span>Séances</span>
          <strong>18</strong>
        </div>
        <div className="studeo-stat">
          <span>Temps étudié</span>
          <strong>9h20</strong>
        </div>
        <div className="studeo-stat">
          <span>Concentration</span>
          <strong>88%</strong>
        </div>
        <div className="studeo-stat">
          <span>Série</span>
          <strong>6 jours</strong>
        </div>
      </div>
      <SectionTitle>Séances d&apos;étude</SectionTitle>
      <div className="studeo-panel">
        <div className="studeo-filter-row">
          <button type="button" className="is-active">
            Tout
          </button>
          <button type="button">Cette semaine</button>
          <button type="button">Ce mois</button>
        </div>
        <div className="studeo-list">
          {sessions.map(([subject, duration, date, focus]) => (
            <article className="studeo-list-row" key={`${subject}-${date}`}>
              <span className="studeo-list-icon">
                <StudeoIcon name="clock" size={18} />
              </span>
              <div>
                <strong>{subject}</strong>
                <p>
                  {date} · {duration}
                </p>
              </div>
              <span className="studeo-pill">{focus}</span>
            </article>
          ))}
        </div>
      </div>
    </StudeoShell>
  );
}
