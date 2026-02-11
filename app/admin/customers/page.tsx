import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { UserService } from '@/server/modules/users/user.service';

const userService = new UserService();

export default async function AdminCustomersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const { users } = await userService.getUsers({ role: 'CUSTOMER', limit: 50 });

  return (
    <div>
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Customers</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-stone-50">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Email</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id} className="border-b border-stone-100">
                <td className="py-3 px-4 text-sm text-stone-900">{user.name}</td>
                <td className="py-3 px-4 text-sm text-stone-600">{user.email}</td>
                <td className="py-3 px-4 text-sm text-stone-600">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
