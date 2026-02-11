'use client';

import { User, Mail, Phone, Shield, Key } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-8 w-48 bg-stone-200 rounded"></div>
                <div className="space-y-4">
                    <div className="h-20 bg-stone-100 rounded-2xl"></div>
                    <div className="h-20 bg-stone-100 rounded-2xl"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-stone-900 mb-2">Profile Settings</h1>
            <p className="text-stone-500 mb-10">Manage your personal information and security preferences</p>

            {/* Personal Info Section */}
            <section className="mb-12">
                <div className="flex items-center gap-2 mb-6 text-stone-900">
                    <User className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg font-bold">Personal Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700">Full Name</label>
                        <div className="relative">
                            <input
                                type="text"
                                defaultValue={session.user.name || ''}
                                className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                            />
                            <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700">Email Address</label>
                        <div className="relative opacity-60">
                            <input
                                type="email"
                                value={session.user.email || ''}
                                readOnly
                                className="w-full pl-4 pr-10 py-3 bg-stone-100 border border-stone-200 rounded-xl font-medium cursor-not-allowed"
                            />
                            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        </div>
                        <p className="text-[10px] text-stone-400">Email cannot be changed directly for security reasons.</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-stone-700">Phone Number</label>
                        <div className="relative">
                            <input
                                type="tel"
                                placeholder="+977-98XXXXXXXX"
                                className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                            />
                            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button className="px-8 py-3 bg-stone-900 text-white font-bold rounded-xl hover:bg-stone-800 transition-all shadow-lg active:scale-95">
                        Save Changes
                    </button>
                    <button className="px-8 py-3 bg-stone-100 text-stone-600 font-bold rounded-xl hover:bg-stone-200 transition-all active:scale-95">
                        Cancel
                    </button>
                </div>
            </section>

            {/* Security Section */}
            <section className="pt-8 border-t border-stone-100">
                <div className="flex items-center gap-2 mb-6 text-stone-900">
                    <Shield className="w-5 h-5 text-amber-600" />
                    <h2 className="text-lg font-bold">Security</h2>
                </div>

                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-100">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-stone-400 border border-stone-100">
                                <Key className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-stone-900">Update Password</h3>
                                <p className="text-stone-500 text-sm">Last changed 4 months ago</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 border-2 border-stone-900 text-stone-900 font-bold rounded-xl hover:bg-stone-900 hover:text-white transition-all text-sm">
                            Change Password
                        </button>
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="mt-16 pt-8 border-t border-stone-100">
                <h3 className="text-red-600 font-bold mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Danger Zone
                </h3>
                <div className="bg-red-50 border border-red-100 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left">
                        <p className="font-black text-red-900 text-sm tracking-tight uppercase">Delete Account</p>
                        <p className="text-red-700 text-xs mt-1 font-medium leading-relaxed max-w-sm">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <button className="px-8 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all text-xs shadow-xl shadow-red-600/20 active:scale-95">
                        Deactivate Account
                    </button>
                </div>
            </section>
        </div>
    );
}
