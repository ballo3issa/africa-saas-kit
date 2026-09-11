import { requireUser } from "@/lib/auth/session";
import { TaskPreviewForm } from "@/components/studeo-preview-forms";
import { DemoBadge, StudeoShell } from "@/components/studeo-shell";

export default async function Page() {
  const session = await requireUser();
  return (
    <StudeoShell
      active="/dashboard/create"
      eyebrow="Créer une nouvelle tâche"
      title="Ajouter à votre liste"
      userName={session.user.name || "Étudiant"}
      headerAction={<DemoBadge />}
    >
      <div className="studeo-dashboard-grid">
        <TaskPreviewForm />
      </div>
    </StudeoShell>
  );
}
