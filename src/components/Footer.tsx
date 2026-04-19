import React, { type FC } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const FooterLogo: FC = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <polygon points="16,2 30,28 2,28" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="round"/>
    <polygon points="16,10 24,24 8,24" fill="rgba(212,175,55,0.12)" stroke="rgba(212,175,55,0.4)" strokeWidth="1" strokeLinejoin="round"/>
    <circle cx="16" cy="16" r="2" fill="#D4AF37"/>
  </svg>
);

export const Footer: FC = () => {
  const t      = useTranslations('footer');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-ink-2/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <FooterLogo />
              <span className="font-bold text-white tracking-widest text-sm">AUREXON</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              {t('tagline')}
            </p>
            <div className="mt-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-gold" />
              <span className="text-[11px] text-text-secondary">{t('liveMarkets')}</span>
            </div>
          </div>

          {/* Platform links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">
              {t('platform')}
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: `${prefix}/`, label: t('linkHome')        },
                { href: `${prefix}/markets`, label: t('linkMarkets')    },
                { href: `${prefix}/incoterms`, label: t('linkIncoterms') },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-text-secondary hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-secondary mb-4">
              {t('contact')}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:trading@aurexon.com"
                  className="text-sm text-text-secondary hover:text-gold transition-colors"
                >
                  trading@aurexon.com
                </a>
              </li>
              <li className="text-sm text-text-secondary">{t('phone')}</li>
              <li>
                <a
                  href="mailto:trading@aurexon.com"
                  className="btn-primary text-xs px-3 py-1.5 mt-2 inline-flex"
                >
                  {t('requestQuote')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-text-secondary/60">
            © {currentYear} Aurexon GmbH. {t('allRights')}
          </p>
          <p className="text-[11px] text-text-secondary/40 text-center">
            {t('disclaimer')}
          </p>
          <div className="flex items-center gap-1">
            <span className="text-[10px] text-text-secondary/40 font-mono">v7.20</span>
            <span className="mx-1.5 text-border-default">·</span>
            <span className="text-[10px] text-text-secondary/40 font-mono">ICC Incoterms® 2020</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
