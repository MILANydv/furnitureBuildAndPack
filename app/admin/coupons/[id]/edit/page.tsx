import { prisma } from '@/lib/prisma/client';
import { CouponForm } from '../../components/CouponForm';
import { notFound } from 'next/navigation';

export default async function EditCouponPage({ params }: { params: { id: string } }) {
    const coupon = await prisma.coupon.findUnique({
        where: { id: params.id },
    });

    if (!coupon) notFound();

    return (
        <div className="max-w-7xl mx-auto">
            <CouponForm initialData={coupon} />
        </div>
    );
}
