import { requireUser } from "@/lib/auth/session";
import {
  DemoBadge,
  SectionTitle,
  StudeoShell,
} from "@/components/studeo-shell";

const messages = [
  ["S", "Sarah M.", "Oui, c'est d'accord !", "À l'instant"],
  ["L", "Lucas B.", "Merci pour l'exercice", "Il y a 2h"],
  ["M", "Marie T.", "On se voit demain ?", "Hier"],
  ["A", "Antoine R.", "Perfect, merci beaucoup", "Mardi"],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/messages"
      eyebrow="Communication"
      title="Messages"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-dashboard-grid">
        <div>
          <input
            className="studeo-search"
            type="search"
            placeholder="Rechercher…"
            aria-label="Rechercher une conversation"
          />
          <SectionTitle>Conversations</SectionTitle>
          <div className="studeo-panel studeo-list">
            {messages.map(([initial, name, preview, time]) => (
              <article className="studeo-list-row" key={name}>
                <span className="studeo-avatar">{initial}</span>
                <div>
                  <strong>{name}</strong>
                  <p>{preview}</p>
                </div>
                <time>{time}</time>
              </article>
            ))}
          </div>
        </div>
        <div>
          <SectionTitle>Demandes</SectionTitle>
          <div className="studeo-panel">
            <p>
              <strong>2 demandes de contact en attente</strong>
            </p>
            <p className="muted">
              La gestion des contacts sera activée après validation des
              permissions métier.
            </p>
          </div>
          <SectionTitle>Conversation</SectionTitle>
          <div className="studeo-empty studeo-panel">
            <div>
              <strong>Sélectionnez une conversation</strong>
              <p>
                Les messages apparaîtront ici sans quitter la page sur grand
                écran.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StudeoShell>
  );
}
