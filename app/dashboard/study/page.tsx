import { requireUser } from "@/lib/auth/session";
import {
  DemoBadge,
  SectionTitle,
  StudeoShell,
} from "@/components/studeo-shell";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";

const subjects: Array<[StudeoIconName, string, string]> = [
  ["clipboard", "Mathématiques", "12 séances"],
  ["languages", "Français", "8 séances"],
  ["atom", "Physique", "6 séances"],
  ["globe", "Anglais", "5 séances"],
  ["landmark", "Histoire", "4 séances"],
  ["flask", "Chimie", "3 séances"],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/study"
      eyebrow="Aujourd'hui"
      title="Prêt à étudier ?"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-dashboard-grid">
        <div>
          <SectionTitle>Choisir une matière</SectionTitle>
          <div className="studeo-choice-grid">
            {subjects.map(([icon, name, count], index) => (
              <button
                type="button"
                key={name}
                className={`studeo-choice ${index === 0 ? "is-selected" : ""}`}
              >
                <strong>
                  <StudeoIcon name={icon} size={17} /> {name}
                </strong>
                <span>{count}</span>
              </button>
            ))}
          </div>
          <SectionTitle>Durée de séance</SectionTitle>
          <div className="studeo-duration-row">
            {["15 min", "30 min", "45 min", "1h"].map((duration, index) => (
              <button
                type="button"
                className={`studeo-duration ${index === 1 ? "is-selected" : ""}`}
                key={duration}
              >
                {duration}
              </button>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Paramètres de séance</SectionTitle>
          <div className="studeo-panel studeo-form">
            <div>
              <small className="muted">Matière sélectionnée</small>
              <h2>Mathématiques</h2>
            </div>
            <div>
              <small className="muted">Durée de séance</small>
              <h2>30 min</h2>
            </div>
            <p className="muted">
              30 min est la durée recommandée pour une séance productive.
            </p>
            <button
              className="studeo-primary"
              type="button"
              disabled
              title="Persistance métier à confirmer"
            >
              Démarrer la séance
            </button>
          </div>
        </div>
      </div>
    </StudeoShell>
  );
}
