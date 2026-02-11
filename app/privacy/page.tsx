import LegalLayout from '@/components/layout/LegalLayout';

export default function PrivacyPage() {
    return (
        <LegalLayout>
            <h1>Privacy Policy</h1>
            <p>
                At ModuLiving, we value your privacy and are committed to protecting your personal data.
                This policy explains how we collect, use, and safeguard your information.
            </p>

            <h2>Information Collection</h2>
            <p>
                We collect information you provide directly to us when you create an account, place an order,
                or contact our support team. This includes your name, email, phone number, and shipping address.
            </p>

            <h2>Data Usage</h2>
            <ul>
                <li>To process and fulfill your orders.</li>
                <li>To send you updates about your delivery status.</li>
                <li>To improve our website functionality and customer experience.</li>
                <li>To send occasional marketing communications (only if you opt-in).</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
                We use industry-standard encryption and security measures to protect your sensitive data.
                We never sell or share your personal information with third parties for marketing purposes.
            </p>

            <h2>Your Rights</h2>
            <p>
                You have the right to access, correct, or delete your personal data at any time through your
                account settings or by contacting our support team.
            </p>
        </LegalLayout>
    );
}
