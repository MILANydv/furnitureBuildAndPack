export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-stone-50 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-200 p-8 sm:p-12 md:p-16">
                    <div className="prose prose-stone prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-headings:text-stone-900 prose-p:text-stone-600 prose-p:font-medium prose-li:text-stone-600 prose-li:font-medium prose-strong:text-stone-900 prose-strong:font-black">
                        {children}
                    </div>
                </div>
                <div className="mt-12 text-center">
                    <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">Last Updated: February 2024</p>
                </div>
            </div>
        </div>
    );
}
