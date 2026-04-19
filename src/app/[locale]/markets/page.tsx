import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MarketsClient } from '@/components/MarketsClient';
import { MOCK_COMMODITIES } from '@/lib/mockData';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('marketsTitle') };
}

export default async function MarketsPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'markets' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-border-subtle">
        <p className="section-title mb-2">{t('pageLabel')}</p>
        <h1 className="text-3xl font-bold text-white">{t('pageHeading')}</h1>
        <p className="text-text-secondary mt-2 max-w-xl">{t('pageSubheading')}</p>
      </div>

      <MarketsClient rows={MOCK_COMMODITIES} />

      {/* Disclaimer */}
      <p className="mt-10 text-[11px] text-text-secondary/50 text-center">
        {t('pageDisclaimer')}
      </p>
    </div>
  );
}
