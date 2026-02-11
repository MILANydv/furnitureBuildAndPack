import { User, Mail, Phone, MapPin, Key, Shield } from 'lucide-react';

export default function ProfilePage() {
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
                                defaultValue="Milan Shrestha"
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
                                defaultValue="milan@example.com"
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
                                defaultValue="+977-98XXXXXXXX"
                                className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500 transition-all font-medium"
                            />
                            <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        </div>
                    </div>
                </div>

                <button className="mt-8 px-8 py-3 bg-amber-600 text-white font-bold rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20">
                    Save Changes
                </button>
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
                                <h3 className="font-bold text-stone-900">Password</h3>
                                <p className="text-stone-500 text-sm">Last changed 4 months ago</p>
                            </div>
                        </div>
                        <button className="px-6 py-2 border-2 border-stone-900 text-stone-900 font-bold rounded-xl hover:bg-stone-900 hover:text-white transition-all text-sm">
                            Update Password
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
                <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-center sm:text-left">
                        <p className="font-bold text-red-900 text-sm">Delete Account</p>
                        <p className="text-red-700 text-xs">This action is permanent and cannot be undone. All your data will be cleared.</p>
                    </div>
                    <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors text-sm">
                        Delete My Account
                    </button>
                </div>
            </section>
        </div>
    );
}
