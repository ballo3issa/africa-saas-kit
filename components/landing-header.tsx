"use client";

import Link from "next/link";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { StudeoIcon } from "@/components/studeo-icon";
import styles from "./landing-page.module.css";

const navigationItems = [
  { href: "#fonctionnalites", label: "Fonctionnalités" },
  { href: "#fonctionnement", label: "Comment ça marche" },
  { href: "#apercus", label: "Aperçus" },
];

export function LandingHeader() {
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let animationFrame = 0;
    let compact = false;

    const updateHeader = () => {
      animationFrame = 0;
      const nextCompact = compact ? window.scrollY > 4 : window.scrollY > 28;

      if (nextCompact !== compact) {
        compact = nextCompact;
        setIsCompact(nextCompact);
      }
    };

    const handleScroll = () => {
      if (animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(updateHeader);
      }
    };

    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 900px)");

    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const section = document.querySelector<HTMLElement>(href);
    if (!section) return;

    event.preventDefault();
    setIsMenuOpen(false);
    section.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    window.history.pushState(null, "", href);
  };

  return (
    <header
      className={styles.header}
      data-menu-open={isMenuOpen}
      data-scroll-state={isCompact ? "compact" : "top"}
    >
      <nav className={styles.nav} aria-label="Navigation principale">
        <a
          className={styles.brandLink}
          href="#accueil"
          onClick={(event) => scrollToSection(event, "#accueil")}
        >
          <span className={styles.brand} aria-label="Etudeo, accueil">
            <span className={styles.brandMark}>
              <StudeoIcon name="graduation" size={19} />
            </span>
            <span>Etudeo</span>
          </span>
        </a>

        <div className={styles.navLinks}>
          {navigationItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              onClick={(event) => scrollToSection(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className={styles.navActions}>
          <Link className={styles.loginLink} href="/login">
            Connexion
          </Link>
          <Link className={styles.primaryButtonSmall} href="/register">
            Créer un compte
          </Link>
          <button
            ref={menuButtonRef}
            className={styles.mobileMenuButton}
            type="button"
            aria-controls="landing-mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <StudeoIcon name={isMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      <div
        className={styles.mobileMenu}
        data-open={isMenuOpen}
        id="landing-mobile-menu"
      >
        <div className={styles.mobileMenuClip}>
          <nav
            className={styles.mobileMenuInner}
            aria-label="Navigation mobile"
          >
            {navigationItems.map((item) => (
              <a
                href={item.href}
                key={item.href}
                onClick={(event) => scrollToSection(event, item.href)}
              >
                <span>{item.label}</span>
                <StudeoIcon name="chevron-right" size={18} />
              </a>
            ))}
            <div className={styles.mobileMenuActions}>
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                Connexion
              </Link>
              <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                Créer un compte
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
