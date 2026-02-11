import LegalLayout from '@/components/layout/LegalLayout';

export default function TermsPage() {
    return (
        <LegalLayout>
            <h1>Terms of Service</h1>
            <p>
                By using the ModuLiving website and purchasing our products, you agree to comply with
                and be bound by the following terms and conditions.
            </p>

            <h2>Product Accuracy</h2>
            <p>
                While we strive for perfect accuracy, actual product colors and textures may vary
                slightly from digital images due to screen calibrations and natural material variations.
            </p>

            <h2>Pricing & Payments</h2>
            <p>
                All prices are listed in Nepalese Rupees (NPR). We reserve the right to change prices
                at any time. Payment must be made in full before we dispatch items for delivery.
            </p>

            <h2>Order Cancellations</h2>
            <p>
                Standard orders can be cancelled within 24 hours for a full refund. Custom orders
                cannot be cancelled once manufacturing has commenced (usually 48 hours after order placement).
            </p>

            <h2>Limitation of Liability</h2>
            <p>
                ModuLiving is not liable for any indirect or consequential damages resulting from the
                use or inability to use our products, or for damages caused by improper assembly of
                flat-pack items.
            </p>
        </LegalLayout>
    );
}
