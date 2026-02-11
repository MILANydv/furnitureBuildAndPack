import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { ProductService } from '@/server/modules/products/product.service';
import Link from 'next/link';

const productService = new ProductService();

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const { products } = await productService.getProducts({ limit: 50 });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-stone-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Category</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Price</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Stock</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product.id} className="border-b border-stone-100">
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-stone-900 hover:text-amber-600 font-medium"
                  >
                    {product.name}
                  </Link>
                </td>
                <td className="py-3 px-4 text-sm text-stone-600">{product.category.name}</td>
                <td className="py-3 px-4 text-sm text-stone-900">${product.basePrice.toFixed(2)}</td>
                <td className="py-3 px-4 text-sm text-stone-600">{product.stock}</td>
                <td className="py-3 px-4">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-amber-600 hover:text-amber-700 text-sm"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
