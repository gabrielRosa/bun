'use client';
import { PrimeReactProvider } from 'primereact/api';

export default function PrimeProvider({ children }: { children: React.ReactNode }) {
  const value = {
    ripple: true,
    inputStyle: 'filled' as const,
    appendTo: 'self' as const
  };

  return (
    <PrimeReactProvider value={value}>
      {children}
    </PrimeReactProvider>
  );
}
