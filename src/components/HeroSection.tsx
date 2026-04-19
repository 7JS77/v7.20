import React, { type FC } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const StatCard: FC<{ value: string; label: string; up?: boolean }> = ({ value, label, up }) => (
  <div className="flex flex-col gap-1 p-4 rounded-xl border border-border-subtle bg-ink-2/60 backdrop-blur-sm">
    <span className={`font-mono text-2xl font-bold tabular-nums ${up === true ? 'text-success' : up === false ? 'text-error' : 'text-gold'}`}>
      {value}
    </span>
    <span className="text-[11px] text-text-secondary uppercase tracking-widest font-medium">{label}</span>
  </div>
);

export const HeroSection: FC = () => {
  const t      = useTranslations('hero');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Decorative gold ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-gold/8 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/80">
              {t('badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight text-balance mb-6">
            {t('headline1')}
            <span className="block text-gold">{t('headline2')}</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg text-text-secondary leading-relaxed mb-10 max-w-xl">
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link href={`${prefix}/markets`} className="btn-primary">
              {t('ctaMarkets')}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link href={`${prefix}/incoterms`} className="btn-secondary">
              {t('ctaIncoterms')}
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14">
            <StatCard value="13" label={t('statCommodities')} />
            <StatCard value="ICC" label={t('statIncoterms')} />
            <StatCard value="3"   label={t('statLanguages')} />
            <StatCard value="Live" label={t('statPrices')} up={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
