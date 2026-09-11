"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard render failed", error.digest || error.name);
  }, [error]);
  return (
    <main className="studeo-content">
      <div className="studeo-panel studeo-empty" role="alert">
        <div>
          <strong>Impossible de charger cet écran</strong>
          <p>
            Vérifiez votre connexion puis réessayez. Aucune donnée saisie
            n&apos;a été enregistrée.
          </p>
          <button type="button" className="studeo-primary" onClick={reset}>
            Réessayer
          </button>
        </div>
      </div>
    </main>
  );
}
