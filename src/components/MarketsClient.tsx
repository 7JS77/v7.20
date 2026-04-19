'use client';

import React, { useState, type FC } from 'react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { MarketTable } from '@/components/MarketTable';
import { BasisCalculator } from '@/components/BasisCalculator';
import type { CommodityRow } from '@/components/MarketTable';
import type { CommodityChartProps } from '@/components/CommodityChart';
import { PHYSICAL_CONTEXT } from '@/lib/mockData';

// ── Dynamic import prevents recharts SSR issues ─────────────────────────────
const CommodityChart = dynamic<CommodityChartProps>(
  () => import('@/components/CommodityChart'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[340px] rounded-xl border border-border-subtle bg-ink-2/40 animate-pulse flex items-center justify-center">
        <span className="text-text-secondary text-sm">Loading chart…</span>
      </div>
    ),
  }
);

interface MarketsClientProps {
  rows: CommodityRow[];
}

export const MarketsClient: FC<MarketsClientProps> = ({ rows }) => {
  const t = useTranslations('markets');

  const [selectedSymbol, setSelectedSymbol] = useState<string>(rows[0]?.symbol ?? '');
  const selected = rows.find((r) => r.symbol === selectedSymbol) ?? rows[0];

  const handleRowSelect = (symbol: string) => {
    setSelectedSymbol(symbol);
    // Scroll to chart on mobile
    document.getElementById('chart-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!selected) return null;

  return (
    <div className="space-y-8">
      {/* ── Market table ──────────────────────────────────────────────── */}
      <section>
        <div className="mb-4">
          <p className="section-title mb-1">{t('tableLabel')}</p>
          <h2 className="section-heading text-xl">{t('tableHeading')}</h2>
          <p className="text-text-secondary text-sm mt-1">{t('tableSubheading')}</p>
        </div>
        <MarketTable
          rows={rows}
          onRowSelect={handleRowSelect}
        />
      </section>

      {/* ── Chart + Calculator grid ───────────────────────────────────── */}
      <section id="chart-section" className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Chart: 3/5 width on xl */}
        <div className="xl:col-span-3 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <p className="section-title">{t('chartLabel')}</p>
            {selectedSymbol && (
              <span className="font-mono text-[10px] text-text-secondary border border-border-subtle rounded px-1.5 py-px">
                {selectedSymbol}
              </span>
            )}
          </div>
          <CommodityChart
            symbol={selected.symbol}
            name={selected.name}
            currency={selected.currency}
            unit={selected.unit}
            physicalContextKey={undefined}
          />
          {/* Physical context note (passed as raw string, not a translation key) */}
          {PHYSICAL_CONTEXT[selected.symbol] && (
            <div className="rounded-lg border border-gold/15 bg-gold/5 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold/60 mb-1">
                {t('physicalContext')}
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                {PHYSICAL_CONTEXT[selected.symbol]}
              </p>
            </div>
          )}
        </div>

        {/* Calculator: 2/5 width on xl */}
        <div className="xl:col-span-2">
          <p className="section-title mb-3">{t('calcLabel')}</p>
          <BasisCalculator
            initialSpotPrice={selected.price}
            currency={selected.currency}
            unit={selected.unit}
            exchange={selected.symbol.split('_')[0]}
            commodityName={selected.name}
            quoteEmailRecipient={process.env.NEXT_PUBLIC_QUOTE_EMAIL ?? 'trading@aurexon.com'}
          />
        </div>
      </section>
    </div>
  );
};

export default MarketsClient;
