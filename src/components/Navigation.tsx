'use client';

import React, { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

const NAV_LINKS = [
  { href: '/',           labelKey: 'home'       },
  { href: '/markets',    labelKey: 'markets'    },
  { href: '/incoterms',  labelKey: 'incoterms'  },
] as const;

const LOCALES = [
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
] as const;

const AurexonLogo: FC = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <polygon points="16,2 30,28 2,28" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="16,10 24,24 8,24" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.5)" strokeWidth="1" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="2" fill="#D4AF37"/>
  </svg>
);

export const Navigation: FC = () => {
  const t        = useTranslations('nav');
  const locale   = useLocale();
  const pathname = usePathname();
  const router   = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build locale-aware href
  const localizedHref = (href: string) => {
    const prefix = locale === 'en' ? '' : `/${locale}`;
    return `${prefix}${href}`;
  };

  // Determine if a nav link is active
  const isActive = (href: string) => {
    const target = localizedHref(href);
    if (href === '/') return pathname === target || pathname === `/${locale}`;
    return pathname.startsWith(target);
  };

  const switchLocale = (newLocale: string) => {
    // Strip current locale prefix and re-add new one
    const segments  = pathname.split('/').filter(Boolean);
    const hasLocale = ['en', 'de', 'es'].includes(segments[0] ?? '');
    const rest      = hasLocale ? segments.slice(1) : segments;
    const newPath   = newLocale === 'en'
      ? `/${rest.join('/')}`
      : `/${newLocale}/${rest.join('/')}`;
    router.push(newPath || '/');
  };

  return (
    <header
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-ink/95 backdrop-blur-md border-b border-border-subtle shadow-ink'
          : 'bg-transparent',
      ].join(' ')}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 gap-6">

          {/* Logo + wordmark */}
          <Link href={localizedHref('/')} className="flex items-center gap-3 shrink-0 group">
            <AurexonLogo />
            <div>
              <span className="font-bold text-white tracking-widest text-base leading-none block">
                AUREXON
              </span>
              <span className="text-[9px] text-gold/60 tracking-[0.22em] font-medium uppercase leading-none block mt-0.5">
                Commodity Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={localizedHref(href)}
                className={[
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive(href)
                    ? 'bg-gold/10 text-gold border border-gold/20'
                    : 'text-text-secondary hover:text-white hover:bg-ink-3',
                ].join(' ')}
              >
                {t(labelKey)}
              </Link>
            ))}
          </div>

          {/* Right: locale switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Locale switcher */}
            <div className="flex items-center rounded-lg border border-border-subtle bg-ink-2 p-0.5">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className={[
                    'px-2.5 py-1 rounded-md text-[11px] font-bold tracking-widest transition-all duration-150',
                    locale === code
                      ? 'bg-gold text-ink shadow-sm'
                      : 'text-text-secondary hover:text-white',
                  ].join(' ')}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <a
              href={`mailto:${process.env.NEXT_PUBLIC_QUOTE_EMAIL ?? 'trading@aurexon.com'}`}
              className="btn-primary text-xs px-4 py-2"
            >
              {t('requestQuote')}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-text-secondary hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            type="button"
          >
            <span className={`block h-px w-6 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border-subtle bg-ink-2/95 backdrop-blur-md py-4 space-y-1">
            {NAV_LINKS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={localizedHref(href)}
                className={[
                  'block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  isActive(href) ? 'bg-gold/10 text-gold' : 'text-text-secondary hover:text-white hover:bg-ink-3',
                ].join(' ')}
                onClick={() => setMenuOpen(false)}
              >
                {t(labelKey)}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-4 pt-2">
              {LOCALES.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => { switchLocale(code); setMenuOpen(false); }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold border transition-all ${
                    locale === code ? 'border-gold text-gold bg-gold/10' : 'border-border-subtle text-text-secondary hover:border-gold/40 hover:text-white'
                  }`}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
