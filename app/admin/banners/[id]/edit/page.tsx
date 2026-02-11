import { prisma } from '@/lib/prisma/client';
import { BannerForm } from '@/app/admin/components/BannerForm';
import { notFound } from 'next/navigation';

export default async function EditBannerPage({ params }: { params: { id: string } }) {
    const banner = await prisma.campaignBanner.findUnique({
        where: { id: params.id },
    });

    if (!banner) notFound();

    return (
        <div className="p-6">
            <BannerForm initialData={banner} />
        </div>
    );
}
