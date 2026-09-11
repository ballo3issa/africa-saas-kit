"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StudeoIcon, type StudeoIconName } from "@/components/studeo-icon";

const items: Array<{
  href: string;
  label: string;
  icon: StudeoIconName;
  primary?: boolean;
}> = [
  { href: "/dashboard", label: "Aujourd'hui", icon: "sun" },
  { href: "/dashboard/week", label: "Semaine", icon: "calendar" },
  { href: "/dashboard/create", label: "Créer", icon: "plus", primary: true },
  { href: "/dashboard/study", label: "Étudier", icon: "timer" },
  { href: "/dashboard/more", label: "Plus", icon: "menu" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="mobile-bottom-nav studeo-mobile-nav"
      aria-label="Navigation mobile principale"
    >
      {items.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-bottom-link ${item.primary ? "studeo-mobile-create" : ""} ${active ? "is-active" : ""}`.trim()}
            aria-current={active ? "page" : undefined}
          >
            <span aria-hidden="true" className="mobile-bottom-icon">
              <StudeoIcon name={item.icon} size={item.primary ? 28 : 19} />
            </span>
            <span className={item.primary ? "sr-only" : undefined}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
