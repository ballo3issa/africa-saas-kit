import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import {
  DemoBadge,
  SectionTitle,
  StudeoShell,
} from "@/components/studeo-shell";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";
import { StudeoSignOut } from "@/components/studeo-sign-out";

const items: Array<[StudeoIconName, string, string, string, boolean]> = [
  [
    "message",
    "Messages",
    "Discuter avec vos contacts",
    "/dashboard/messages",
    true,
  ],
  [
    "history",
    "Historique",
    "Vos séances d'étude passées",
    "/dashboard/history",
    true,
  ],
  [
    "bell",
    "Notifications",
    "Rappels et alertes récentes",
    "/dashboard/notifications",
    true,
  ],
  ["user", "Profil", "Vos informations personnelles", "#", false],
  [
    "settings",
    "Paramètres",
    "Personnaliser l'application",
    "/dashboard/security",
    true,
  ],
  ["help", "Aide", "FAQ et support", "#", false],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/more"
      eyebrow="Mon compte"
      title="Plus"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <SectionTitle>Menu</SectionTitle>
      <div className="studeo-panel studeo-list">
        {items.map(([icon, title, detail, href, enabled]) => {
          const content = (
            <>
              <span className="studeo-list-icon">
                <StudeoIcon name={icon} size={18} />
              </span>
              <div>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
              {enabled ? (
                <span aria-hidden="true">
                  <StudeoIcon name="chevron-right" size={17} />
                </span>
              ) : (
                <small className="studeo-soon">À confirmer</small>
              )}
            </>
          );

          return enabled ? (
            <Link href={href} className="studeo-list-row" key={title}>
              {content}
            </Link>
          ) : (
            <div
              aria-disabled="true"
              className="studeo-list-row is-disabled"
              key={title}
            >
              {content}
            </div>
          );
        })}
      </div>
      <SectionTitle>Compte</SectionTitle>
      <div className="studeo-panel">
        <strong>{session.user.name || "Amadou"}</strong>
        <p className="muted">{session.user.email}</p>
        <div className="studeo-account-stats" aria-label="Résumé du compte">
          <span>
            <strong>18</strong> séances
          </span>
          <span>
            <strong>9h20</strong> étudiées
          </span>
        </div>
        <StudeoSignOut />
      </div>
      <p className="studeo-version">Etudeo · Aperçu UI</p>
    </StudeoShell>
  );
}
