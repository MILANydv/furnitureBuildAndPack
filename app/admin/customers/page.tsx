import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { UserService } from '@/server/modules/users/user.service';
import { Search, Mail, UserPlus, Filter, MoreHorizontal, ShoppingBag, MapPin } from 'lucide-react';

const userService = new UserService();

export default async function AdminCustomersPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'ADMIN') {
    redirect('/');
  }

  const { users } = await userService.getUsers({ role: 'CUSTOMER', limit: 50 });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 leading-none mb-2">Customer Base</h1>
          <p className="text-stone-500 font-medium">Manage your relationships and view customer history.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all flex items-center gap-2 text-sm shadow-xl shadow-stone-900/10 active:scale-95">
            <UserPlus className="w-4 h-4" />
            Add Prospect
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Total Customers</p>
          <p className="text-2xl font-black text-stone-900">{users.length}</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-green-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">New This Month</p>
          <p className="text-2xl font-black">24</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-amber-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Active Shoppers</p>
          <p className="text-2xl font-black">156</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm text-purple-600">
          <p className="text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2">Avg. LTV</p>
          <p className="text-2xl font-black">NPR 45K</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search by name, email or location..."
            className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-transparent rounded-2xl focus:bg-white focus:border-amber-500 focus:ring-0 transition-all font-medium text-stone-900"
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-6 py-3 bg-stone-50 border border-transparent rounded-2xl flex items-center justify-center gap-2 font-bold text-stone-600 hover:bg-stone-100 transition-all text-sm">
            <Filter className="w-4 h-4" />
            Segments
          </button>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-stone-200 overflow-hidden shadow-stone-200/40">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50/80 border-b border-stone-100">
              <tr>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Customer Profile</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Contact</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Activity</th>
                <th className="px-8 py-5 text-left text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Joined Date</th>
                <th className="px-8 py-5 text-right text-[11px] font-black text-stone-500 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-amber-50/20 transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400 font-black border border-stone-200 group-hover:scale-110 transition-transform">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900 group-hover:text-amber-600 transition-colors">{user.name || 'Anonymous'}</p>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">
                          <MapPin className="w-3 h-3" />
                          Kathmandu, Nepal
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 text-stone-600 group-hover:text-stone-900 transition-colors">
                      <Mail className="w-4 h-4 text-stone-300" />
                      <span className="text-sm font-medium">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[11px] font-bold text-stone-500 bg-stone-50 px-2 py-1 rounded-lg">
                        <ShoppingBag className="w-3 h-3 text-stone-400" />
                        3 Orders
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-sm font-bold text-stone-900">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
                        <Mail className="w-4.5 h-4.5" />
                      </button>
                      <button className="p-2.5 text-stone-400 hover:text-stone-900 hover:bg-stone-100 rounded-xl transition-all">
                        <MoreHorizontal className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-12 text-center text-stone-400 italic">No customers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
