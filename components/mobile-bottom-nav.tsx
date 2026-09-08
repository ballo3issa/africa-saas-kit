import Link from "next/link";

const items = [
  { href: "/", label: "Accueil", icon: "⌂" },
  { href: "/dashboard", label: "Dashboard", icon: "◫" },
  { href: "/dashboard/billing", label: "Abonnement", icon: "◉" },
  { href: "/dashboard/security", label: "Sécurité", icon: "◇" },
];

export function MobileBottomNav() {
  return <nav className="mobile-bottom-nav" aria-label="Navigation mobile principale">
    {items.map(item => <Link key={item.href} href={item.href} className="mobile-bottom-link">
      <span aria-hidden="true" className="mobile-bottom-icon">{item.icon}</span>
      <span>{item.label}</span>
    </Link>)}
  </nav>;
}
