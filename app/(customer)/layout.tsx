import { Navbar } from '@/app/components/layout/Navbar';
import { SessionProvider } from 'next-auth/react';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
