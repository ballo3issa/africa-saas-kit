"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth/client";
import { StudeoIcon } from "@/components/studeo-icon";

export function StudeoSignOut() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function signOut() {
    setPending(true);
    setError("");

    const result = await authClient.signOut();
    if (result.error) {
      setError("La déconnexion a échoué. Réessayez.");
      setPending(false);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="studeo-sign-out-wrap">
      <button
        className="studeo-sign-out"
        disabled={pending}
        onClick={signOut}
        type="button"
      >
        <StudeoIcon name="logout" size={18} />
        {pending ? "Déconnexion…" : "Se déconnecter"}
      </button>
      {error ? (
        <p className="studeo-inline-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
