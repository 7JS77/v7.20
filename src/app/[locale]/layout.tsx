import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PriceTicker } from '@/components/PriceTicker';
import { TICKER_ITEMS } from '@/lib/mockData';
import '../globals.css';

interface LayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: LayoutProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: { default: t('siteTitle'), template: `%s | ${t('siteName')}` },
    description: t('siteDescription'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aurexon.com'),
    openGraph: {
      type: 'website',
      locale,
      siteName: t('siteName'),
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  if (!routing.locales.includes(locale as 'en' | 'de' | 'es')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-ink text-text-primary antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <PriceTicker items={TICKER_ITEMS} />
          <main className="pt-10 min-h-screen">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
