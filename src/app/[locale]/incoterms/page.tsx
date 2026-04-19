import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { IncotermsClient } from '@/components/IncotermsClient';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return { title: t('incotermsTitle') };
}

export default async function IncotermsPage({ params: { locale } }: PageProps) {
  const t = await getTranslations({ locale, namespace: 'incotermsPage' });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8 pb-6 border-b border-border-subtle">
        <p className="section-title mb-2">{t('pageLabel')}</p>
        <h1 className="text-3xl font-bold text-white">{t('pageHeading')}</h1>
        <p className="text-text-secondary mt-2 max-w-2xl leading-relaxed">
          {t('pageSubheading')}
        </p>

        {/* ICC notice */}
        <div className="mt-5 inline-flex items-start gap-3 rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 max-w-2xl">
          <svg className="w-4 h-4 text-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-xs text-text-secondary leading-relaxed">
            {t('iccNotice')}
          </p>
        </div>
      </div>

      {/* The full interactive tool */}
      <IncotermsClient />

      <p className="mt-8 text-[11px] text-text-secondary/40 text-center">
        {t('pageDisclaimer')}
      </p>
    </div>
  );
}
