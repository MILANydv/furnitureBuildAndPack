import { prisma } from '@/lib/prisma/client';
import { BannerForm } from '../../components/BannerForm';
import { notFound } from 'next/navigation';

export default async function EditBannerPage({ params }: { params: { id: string } }) {
    const banner = await prisma.campaignBanner.findUnique({
        where: { id: params.id },
    });

    if (!banner) notFound();

    return (
        <div className="max-w-7xl mx-auto">
            <BannerForm initialData={banner} />
        </div>
    );
}
