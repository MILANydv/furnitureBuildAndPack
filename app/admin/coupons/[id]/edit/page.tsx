import { prisma } from '@/lib/prisma/client';
import { CouponForm } from '@/app/admin/components/CouponForm';
import { notFound } from 'next/navigation';

export default async function EditCouponPage({ params }: { params: { id: string } }) {
    const coupon = await prisma.coupon.findUnique({
        where: { id: params.id },
    });

    if (!coupon) notFound();

    return (
        <div className="p-6">
            <CouponForm initialData={coupon} />
        </div>
    );
}
