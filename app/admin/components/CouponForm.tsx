'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Tag, Calendar, Percent, IndianRupee, Hash } from 'lucide-react';

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
                router.push('/admin/coupons');
                router.refresh();
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-10 max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between pb-8 border-b border-stone-100">
                <h1 className="text-2xl font-black uppercase tracking-tight">{initialData ? 'Refine Promotion' : 'Mint New Coupon'}</h1>
                <div className="flex gap-4">
                    <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-white border border-stone-200 rounded-[10px] text-stone-600 font-bold hover:bg-stone-50 transition-all text-xs uppercase tracking-widest leading-none">Discard</button>
                    <button type="submit" disabled={isLoading} className="px-8 py-3 bg-amber-600 text-white font-black rounded-[10px] hover:bg-amber-700 transition-all text-xs uppercase tracking-widest leading-none flex items-center gap-2 shadow-xl shadow-amber-600/20 disabled:opacity-50">
                        {isLoading && <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        <Save className="w-4 h-4" />
                        Activate Code
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3 space-y-8">
                    <section className="bg-white p-8 rounded-[10px] border border-stone-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Hash className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-900">Core Identity</h2>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Redemption Code</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. LUXURY2025"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                className="w-full px-6 py-4 bg-stone-50 rounded-[10px] text-2xl font-black tracking-widest border-2 border-transparent focus:bg-white focus:border-amber-500 transition-all outline-none uppercase"
                            />
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[10px] border border-stone-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <Percent className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-900">Economic Value</h2>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Discount Mode</label>
                                <div className="flex bg-stone-50 p-1 rounded-[10px]">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, discountType: 'PERCENTAGE' })}
                                        className={`flex-1 py-2 rounded-lg text-xs font-black uppercase transition-all ${formData.discountType === 'PERCENTAGE' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-400'}`}
                                    >
                                        Percentage
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, discountType: 'FIXED' })}
                                        className={`flex-1 py-2 rounded-lg text-xs font-black uppercase transition-all ${formData.discountType === 'FIXED' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-400'}`}
                                    >
                                        Fixed NPR
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Magnitude</label>
                                <input
                                    type="number"
                                    required
                                    value={formData.discountValue}
                                    onChange={(e) => setFormData({ ...formData, discountValue: parseFloat(e.target.value) })}
                                    className="w-full px-6 py-2.5 bg-stone-100 rounded-[10px] font-black text-stone-900 text-center"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                <div className="md:col-span-2 space-y-8">
                    <section className="bg-stone-900 p-8 rounded-[10px] text-white shadow-2xl space-y-6">
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-amber-500" />
                            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-500">Temporal Constraints</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase text-stone-500 tracking-widest">Starts Valid</span>
                                <input
                                    type="date"
                                    value={formData.validFrom}
                                    onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-2 text-xs font-bold text-white outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <span className="text-[10px] font-bold uppercase text-stone-500 tracking-widest">Ends Valid</span>
                                <input
                                    type="date"
                                    value={formData.validUntil}
                                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-[10px] px-4 py-2 text-xs font-bold text-white outline-none"
                                />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-[10px] border border-stone-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <Tag className="w-5 h-5 text-amber-500" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-stone-900">Usage Logic</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Max Minting (Uses)</label>
                                <input
                                    type="number"
                                    value={formData.maxUses}
                                    onChange={(e) => setFormData({ ...formData, maxUses: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2 bg-stone-50 rounded-lg text-sm font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-stone-500 uppercase tracking-widest ml-1">Threshold NPR</label>
                                <input
                                    type="number"
                                    value={formData.minOrderAmount}
                                    onChange={(e) => setFormData({ ...formData, minOrderAmount: parseFloat(e.target.value) })}
                                    className="w-full px-4 py-2 bg-stone-50 rounded-lg text-sm font-bold"
                                />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
}
