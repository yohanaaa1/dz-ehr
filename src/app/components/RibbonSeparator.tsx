import React from 'react';

interface RibbonSeparatorProps {
  thin?: boolean;
}

export default function RibbonSeparator({ thin = false }: RibbonSeparatorProps) {
  return (
    <div
      className={`w-full ribbon-gradient ${thin ? 'h-0.5' : 'h-1.5'}`}
      aria-hidden="true"
    />
  );
}