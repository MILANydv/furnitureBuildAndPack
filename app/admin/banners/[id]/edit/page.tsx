import { prisma } from '@/lib/prisma/client';
import { BannerForm } from '@/app/admin/components/BannerForm';
import { notFound } from 'next/navigation';

export default async function EditBannerPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const banner = await prisma.campaignBanner.findUnique({
        where: { id },
    });

    if (!banner) notFound();

    return (
        <div className="p-6">
            <BannerForm initialData={banner} />
        </div>
    );
}
