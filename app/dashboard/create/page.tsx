import Link from "next/link";
import { requireUser } from "@/lib/auth/session";
import { DemoBadge, StudeoShell } from "@/components/studeo-shell";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";

const options: Array<[StudeoIconName, string, string, string, boolean]> = [
  [
    "check",
    "Créer une tâche",
    "Ajouter une tâche à votre liste de choses à faire",
    "/dashboard/create/task",
    true,
  ],
  [
    "calendar",
    "Créer un événement",
    "Planifier un cours ou un événement important",
    "/dashboard/create/event",
    true,
  ],
  [
    "bell",
    "Créer un rappel",
    "Définir une alerte pour vous rappeler quelque chose",
    "#",
    false,
  ],
  [
    "users",
    "Créer un groupe d'étude",
    "Inviter des camarades pour étudier ensemble",
    "#",
    false,
  ],
  [
    "file",
    "Partager une ressource",
    "Ajouter un lien ou un document utile",
    "#",
    false,
  ],
  [
    "notebook",
    "Créer une note",
    "Prendre des notes ou des annotations",
    "#",
    false,
  ],
];

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/create"
      eyebrow="Créer quelque chose de nouveau"
      title="Qu'allez-vous créer ?"
      userName={session.user.name || "Amadou"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-create-grid">
        {options.map(([icon, title, description, href, enabled]) =>
          enabled ? (
            <Link href={href} className="studeo-create-option" key={title}>
              <span className="studeo-create-icon">
                <StudeoIcon name={icon} size={22} />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <span className="studeo-create-action">
                Créer <StudeoIcon name="chevron-right" size={15} />
              </span>
            </Link>
          ) : (
            <div
              className="studeo-create-option"
              aria-disabled="true"
              key={title}
            >
              <span className="studeo-create-icon">
                <StudeoIcon name={icon} size={22} />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <span>À confirmer</span>
            </div>
          ),
        )}
      </div>
    </StudeoShell>
  );
}
