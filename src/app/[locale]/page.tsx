import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/HeroSection';
import { MarketTable } from '@/components/MarketTable';
import { MOCK_COMMODITIES } from '@/lib/mockData';
import Link from 'next/link';
import { useLocale } from 'next-intl';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('homeTitle') };
}

// Feature cards for the platform overview section
const FEATURES = [
  {
    icon: '⬡',
    titleKey: 'feature1Title',
    descKey:  'feature1Desc',
  },
  {
    icon: '◈',
    titleKey: 'feature2Title',
    descKey:  'feature2Desc',
  },
  {
    icon: '⟐',
    titleKey: 'feature3Title',
    descKey:  'feature3Desc',
  },
];

export default async function HomePage({ params: { locale } }: PageProps) {
  const t      = await getTranslations({ locale, namespace: 'home' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Show just the top 5 commodities on the home page
  const previewRows = MOCK_COMMODITIES.slice(0, 5);

  return (
    <>
      <HeroSection />

      {/* ── Feature cards ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="section-title mb-2">{t('featuresLabel')}</p>
          <h2 className="section-heading">{t('featuresHeading')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map(({ icon, titleKey, descKey }) => (
            <div key={titleKey} className="card-hover group">
              <div className="text-2xl mb-4 text-gold">{icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{t(titleKey as Parameters<typeof t>[0])}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{t(descKey as Parameters<typeof t>[0])}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Market preview ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="section-title mb-1">{t('marketLabel')}</p>
            <h2 className="section-heading text-xl">{t('marketHeading')}</h2>
          </div>
          <Link href={`${prefix}/markets`} className="btn-ghost text-xs">
            {t('viewAll')} →
          </Link>
        </div>
        <MarketTable rows={previewRows} />
      </section>

      {/* ── Incoterms CTA strip ────────────────────────────────────────── */}
      <section className="border-y border-border-subtle bg-ink-2/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="section-title mb-2">{t('incotermsCta')}</p>
            <h2 className="text-xl font-bold text-white">{t('incotermsCtaHeading')}</h2>
            <p className="text-text-secondary text-sm mt-1">{t('incotermsCtaDesc')}</p>
          </div>
          <Link href={`${prefix}/incoterms`} className="btn-primary shrink-0">
            {t('incotermsCtaBtn')}
          </Link>
        </div>
      </section>
    </>
  );
}
