import { Navbar } from '@/app/components/layout/Navbar';
import AuthProvider from '@/app/components/providers/AuthProvider';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}
