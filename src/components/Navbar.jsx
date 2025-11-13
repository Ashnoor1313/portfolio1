// src/components/Navbar.jsx
import React, { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(64); // fallback

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // measure header height so mobile menu doesn't get clipped
  useEffect(() => {
    const measure = () => {
      const el = headerRef.current;
      if (el) {
        const h = Math.ceil(el.getBoundingClientRect().height);
        setHeaderHeight(h || 64);
      }
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // close on outside click or Escape key
  useEffect(() => {
    function handleOutside(e) {
      if (!open) return;
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(e.target) &&
        headerRef.current &&
        !headerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // prevent background scrolling while the menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.touchAction = "";
    };
  }, [open]);

  const menu = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`apple-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "apple-navbar--scrolled" : ""
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: brand */}
            <div className="flex items-center gap-4">
              <a href="#home" className="flex items-center gap-3 no-glow" aria-label="Homepage">
                <div className="logo-dot w-9 h-9 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-sm">AS</span>
                </div>
                <span className="hidden sm:inline text-lg font-bold tracking-tight">Ashnoor Singh</span>
              </a>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center" aria-label="Primary">
              <ul className="flex items-center gap-6">
                {menu.map((m) => (
                  <li key={m.href}>
                    <a href={m.href} className="nav-link text-sm font-medium transition focus:outline-none">
                      {m.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right: social + CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              {/* GitHub + LinkedIn on sm+ */}
              <div className="hidden sm:flex items-center gap-3">
                <a
                  href="https://github.com/Ashnoor1313"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link p-2 rounded-md"
                  aria-label="GitHub"
                >
                  {/* svg */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 0.5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-1.17-.01-2.12-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.75.4-1.24.72-1.52-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.18a10.9 10.9 0 0 1 2.86-.38c.97.01 1.95.13 2.86.38 2.17-1.49 3.13-1.18 3.13-1.18.62 1.57.23 2.73.11 3.02.73.81 1.18 1.85 1.18 3.11 0 4.44-2.71 5.42-5.29 5.7.41.35.77 1.04.77 2.1 0 1.52-.01 2.75-.01 3.12 0 .31.2.67.79.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/ashnoor-singh-683640298"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-link p-2 rounded-md"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.78v1.7h.05c.53-1 1.83-2.1 3.77-2.1C20.9 8.6 22 10.6 22 14.1V21H18v-6c0-1.43-.03-3.27-1.99-3.27-1.99 0-2.29 1.55-2.29 3.15V21H9z" />
                  </svg>
                </a>
              </div>

              {/* Contact CTA hidden on xs */}
              <a href="#contact" className="hidden sm:inline-flex items-center gap-2 btn-cta">
                Contact
              </a>

              {/* Mobile menu toggle */}
              <button
                ref={toggleRef}
                className="md:hidden p-2 rounded-md mobile-toggle"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((s) => !s)}
                type="button"
              >
                {open ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu - moved OUTSIDE the header to avoid clipping/stacking issues */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`mobile-menu md:hidden mobile-menu--open`}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: `${headerHeight}px`, // anchor below header
            zIndex: 99999,
            // visible glass background so items are readable over the canvas
            background: "linear-gradient(180deg, rgba(2,6,23,0.75), rgba(2,6,23,0.56))",
            backdropFilter: "blur(8px) saturate(120%)",
            WebkitBackdropFilter: "blur(8px) saturate(120%)",
            // fill the remaining viewport height
            bottom: 0,
            overflowY: "auto",
          }}
        >
          <nav className="px-4 pt-4 pb-6" aria-label="Mobile primary">
            <ul className="space-y-3">
              {menu.map((m) => (
                <li key={m.href}>
                  <a
                    href={m.href}
                    className="block py-3 px-3 rounded-md text-base font-medium nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {m.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="block btn-cta w-full text-center py-2"
                  onClick={() => setOpen(false)}
                >
                  Contact
                </a>
              </li>
              
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
