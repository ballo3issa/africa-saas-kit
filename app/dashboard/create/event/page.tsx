import { requireUser } from "@/lib/auth/session";
import { EventPreviewForm } from "@/components/studeo-preview-forms";
import { DemoBadge, StudeoShell } from "@/components/studeo-shell";

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/create"
      eyebrow="Créer un nouvel événement"
      title="Planifier un événement"
      userName={session.user.name || "Étudiant"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-dashboard-grid">
        <EventPreviewForm />
      </div>
    </StudeoShell>
  );
}
