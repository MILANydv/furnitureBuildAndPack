'use client';

import { usePathname } from 'next/navigation';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import ReactQueryProvider from "@/app/components/providers/ReactQueryProvider";
import AuthProvider from "@/app/components/providers/AuthProvider";

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith('/admin');

    return (
        <AuthProvider>
            <ReactQueryProvider>
                {!isAdminPage && <Header />}
                <main>{children}</main>
                {!isAdminPage && <Footer />}
            </ReactQueryProvider>
        </AuthProvider>
    );
}
