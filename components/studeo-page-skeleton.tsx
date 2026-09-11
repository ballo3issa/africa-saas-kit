import { Skeleton } from "@/components/ui/skeleton";

export function StudeoPageSkeleton({ cards = 4 }: { cards?: number }) {
  return (
    <div
      className="studeo-app studeo-loading"
      aria-busy="true"
      aria-label="Chargement de la page"
    >
      <aside className="studeo-sidebar" aria-hidden="true">
        <Skeleton height="42px" />
        <Skeleton height="46px" />
        <Skeleton height="320px" />
      </aside>
      <div className="studeo-main">
        <header className="studeo-topbar" aria-hidden="true">
          <div>
            <Skeleton width="150px" height="13px" />
            <Skeleton width="260px" height="28px" />
          </div>
        </header>
        <main className="studeo-content">
          <Skeleton height="150px" />
          <div className="studeo-card-grid" aria-hidden="true">
            {Array.from({ length: cards }, (_, index) => (
              <Skeleton key={index} height="132px" />
            ))}
          </div>
        </main>
      </div>
      <span className="sr-only">Chargement…</span>
    </div>
  );
}
