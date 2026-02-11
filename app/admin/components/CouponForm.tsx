'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Save,
    Tag,
    Calendar,
    Percent,
    IndianRupee,
    Hash,
    ChevronLeft,
    Trash2,
    Clock,
    ShieldCheck,
    Settings2,
    Trophy,
    History,
    Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export function CouponForm({ initialData }: { initialData?: any }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        code: initialData?.code || '',
        discountType: initialData?.discountType || 'PERCENTAGE',
        discountValue: initialData?.discountValue || 0,
        minOrderAmount: initialData?.minOrderAmount || 0,
        maxUses: initialData?.maxUses || 0,
        validFrom: initialData?.validFrom ? new Date(initialData.validFrom).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        validUntil: initialData?.validUntil ? new Date(initialData.validUntil).toISOString().split('T')[0] : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isActive: initialData?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const url = initialData
                ? `/api/admin/coupons/${initialData.id}`
                : '/api/admin/coupons';
            const method = initialData ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success(initialData ? 'Coupon updated' : 'Coupon minted');
                router.push('/admin/coupons');
                router.refresh();
            } else {
                toast.error('Failed to save coupon');
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            {/* Breadcrumb Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-all text-stone-500"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                            {initialData ? `Coupon: ${initialData.code}` : 'Mint New Coupon'}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-stone-500 hover:text-stone-900 transition-all font-sans"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 py-2 bg-stone-900 text-white text-sm font-bold rounded-lg hover:bg-stone-800 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        {initialData ? 'Update Promotion' : 'Activate Code'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Identity Section */}
                    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm">
                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Hash className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-1">
                                <label className="text-[13px] font-bold text-stone-700">Code Designation</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. SAVE20"
                                    value={formData.code}
                                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                    className="w-full text-lg font-black tracking-widest bg-white border border-stone-200 rounded-md px-3 py-2.5 focus:ring-2 focus:ring-stone-900/5 focus:border-stone-900 outline-none transition-all uppercase placeholder:text-stone-200"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Percent className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 space-y-3">
                                <label className="text-[13px] font-bold text-stone-700">Economics</label>
                                <div className="flex gap-4">
                                    <div className="flex-1 flex bg-stone-100 p-1 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, discountType: 'PERCENTAGE' })}
                                            className={`flex-1 py-2 rounded-md text-[11px] font-bold uppercase transition-all ${formData.discountType === 'PERCENTAGE' ? 'bg-white shadow-sm text-stone-900 border border-stone-200' : 'text-stone-400'}`}
                                        >
                                            Percentage
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, discountType: 'FIXED' })}
                                            className={`flex-1 py-2 rounded-md text-[11px] font-bold uppercase transition-all ${formData.discountType === 'FIXED' ? 'bg-white shadow-sm text-stone-900 border border-stone-200' : 'text-stone-400'}`}
                                        >
                                            Fixed Amount
                                        </button>
                                    </div>
                                    <div className="w-32 relative">
                                        <input
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                                            className="w-full text-[13px] font-bold text-right bg-white border border-stone-200 rounded-lg px-3 py-2"
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-stone-400">VALUE</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-b border-stone-100 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Clock className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Valid From</label>
                                    <input
                                        type="date"
                                        value={formData.validFrom}
                                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                        className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 outline-none focus:border-stone-900"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Valid Until</label>
                                    <input
                                        type="date"
                                        value={formData.validUntil}
                                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                        className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 outline-none focus:border-stone-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 flex items-start gap-4 hover:bg-stone-50/50 transition-colors">
                            <Trophy className="w-4.5 h-4.5 text-stone-400 mt-2.5" />
                            <div className="flex-1 grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Minimum Order</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={formData.minOrderAmount}
                                            onChange={(e) => setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) })}
                                            className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 pl-10 outline-none focus:border-stone-900"
                                        />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-stone-400">NPR</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[13px] font-bold text-stone-700">Maximum Claims</label>
                                    <input
                                        type="number"
                                        value={formData.maxUses}
                                        onChange={(e) => setFormData({ ...formData, maxUses: parseInt(e.target.value) })}
                                        className="w-full text-[13px] font-medium bg-white border border-stone-200 rounded-md px-3 py-2 outline-none focus:border-stone-900"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-900 rounded-xl p-8 text-white shadow-xl flex items-center justify-between group overflow-hidden relative">
                        <div className="relative z-10 flex-1">
                            <div className="flex items-center gap-2 mb-2 text-stone-400 uppercase tracking-widest text-[10px] font-bold">
                                <ShieldCheck className="w-3.5 h-3.5" /> Promotion Logic Guard
                            </div>
                            <p className="text-sm font-medium text-stone-300 leading-relaxed max-w-sm">
                                This code will be validated dynamically at checkout. Ensure minimum thresholds align with current product pricing.
                            </p>
                        </div>
                        <div className="text-6xl font-black text-white/5 absolute -right-4 -bottom-4 group-hover:text-white/10 transition-colors select-none">COUPON</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-6 space-y-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Settings2 className="w-4 h-4 text-stone-400" />
                                    <span className="text-[13px] font-bold text-stone-700">Activation Status</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                                    className={`w-10 h-5.5 rounded-full relative transition-all ${formData.isActive ? 'bg-stone-900' : 'bg-stone-200'}`}
                                >
                                    <div className={`absolute top-0.75 w-4 h-4 bg-white rounded-full transition-all ${formData.isActive ? 'left-5.25' : 'left-0.75'}`}></div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-stone-100 space-y-2">
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all text-left">
                                <History className="w-4 h-4" />
                                View usage history
                            </button>
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-stone-500 hover:bg-stone-50 transition-all text-left">
                                <Info className="w-4 h-4" />
                                Growth analytics
                            </button>
                            <button type="button" className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-bold text-red-500 hover:bg-red-50 transition-all text-left">
                                <Trash2 className="w-4 h-4" />
                                Terminate coupon
                            </button>
                        </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-stone-200 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-4">Live Representation</div>
                        <div className="inline-block px-10 py-4 bg-dashed-border border-2 border-dashed border-stone-200 rounded-lg">
                            <p className="text-2xl font-black text-stone-900 tracking-widest">{formData.code || 'CODE'}</p>
                            <p className="text-[10px] font-bold text-stone-500 opacity-60 uppercase mt-1">
                                {formData.discountType === 'PERCENTAGE' ? `${formData.discountValue}% OFF` : `NPR ${formData.discountValue} OFF`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
