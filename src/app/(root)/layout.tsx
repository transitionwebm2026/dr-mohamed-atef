import type { ReactNode } from 'react';

/** Minimal root layout for "/" — it only redirects to the default locale. */
export default function RootRedirectLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
