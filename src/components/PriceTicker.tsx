'use client';

import React, { type FC } from 'react';
import type { TickerItem } from '@/lib/mockData';

interface PriceTickerProps {
  items: TickerItem[];
}

function formatTickerPrice(price: number, currency: string): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: price < 100 ? 3 : 2,
    maximumFractionDigits: price < 100 ? 3 : 2,
  }).format(price);
}

const TickerCell: FC<{ item: TickerItem }> = ({ item }) => {
  const isUp = item.changePct >= 0;
  return (
    <div className="flex items-center gap-3 px-6 shrink-0 border-r border-border-subtle/50 last:border-r-0">
      <span className="text-[11px] font-bold uppercase tracking-widest text-text-secondary font-mono">
        {item.symbol}
      </span>
      <span className="font-mono text-sm font-semibold text-white tabular-nums">
        {formatTickerPrice(item.price, item.currency)}
      </span>
      <span className={`font-mono text-xs font-semibold tabular-nums ${isUp ? 'text-success' : 'text-error'}`}>
        {isUp ? '▲' : '▼'} {Math.abs(item.changePct).toFixed(2)}%
      </span>
    </div>
  );
};

export const PriceTicker: FC<PriceTickerProps> = ({ items }) => {
  // Duplicate items so the scroll loops seamlessly
  const doubled = [...items, ...items];

  return (
    <div
      className="w-full overflow-hidden border-b border-border-subtle bg-ink-2/80 backdrop-blur-sm h-10 flex items-center"
      aria-label="Live price ticker"
      role="marquee"
    >
      {/* Leading label */}
      <div className="shrink-0 flex items-center gap-2 pl-4 pr-6 border-r border-border-subtle/50 h-full bg-ink-3/50">
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold/70">Live</span>
      </div>

      {/* Scrolling strip */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center animate-ticker whitespace-nowrap py-2 h-10">
          {doubled.map((item, i) => (
            <TickerCell key={`${item.symbol}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;
