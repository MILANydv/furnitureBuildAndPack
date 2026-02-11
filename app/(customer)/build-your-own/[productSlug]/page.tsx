import { prisma } from '@/lib/prisma/client';
import { ConfiguratorClient } from './ConfiguratorClient';

export async function generateStaticParams() {
  const products = await prisma.product.findMany({
    where: { isConfigurable: true },
    select: { slug: true },
  });

  return products.map((product) => ({
    productSlug: product.slug,
  }));
}

export default function ConfiguratorPage() {
  return <ConfiguratorClient />;
}
