import Link from "next/link";
import { PremiumIcon, type PremiumIconName } from "@/components/ui/premium-icon";

const items: Array<{ href: string; label: string; icon: PremiumIconName }> = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/dashboard/billing", label: "Abonnement", icon: "billing" },
  { href: "/dashboard/security", label: "Sécurité", icon: "security" },
];

export function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navigation mobile principale">
      {items.map((item) => (
        <Link key={item.href} href={item.href} className="mobile-bottom-link">
          <span aria-hidden="true" className="mobile-bottom-icon">
            <PremiumIcon name={item.icon} size={20} />
          </span>
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
