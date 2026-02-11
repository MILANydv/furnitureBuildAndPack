import LegalLayout from '@/components/layout/LegalLayout';

export default function ReturnsPage() {
    return (
        <LegalLayout>
            <h1>Returns & Refunds</h1>
            <p>
                We want you to love your new furniture. If something isn&apos;t quite right, we are here
                to help you with the return process.
            </p>

            <h2>7-Day Return Policy</h2>
            <p>
                You have 7 calendar days to return an item from the date you received it.
                To be eligible for a return, your item must be unused, in the same condition
                that you received it, and in the original packaging.
            </p>

            <h2>Non-Returnable Items</h2>
            <ul>
                <li>Custom-built or personalized products made using our 3D configurator.</li>
                <li>Items that have been assembled or partially assembled.</li>
                <li>Items without original packaging.</li>
            </ul>

            <h2>Damaged Items</h2>
            <p>
                If your item arrives damaged, please document it with photos and contact us
                immediately (within 24 hours of delivery). We will arrange for a swift replacement
                at no additional cost to you.
            </p>

            <h2>Refund Process</h2>
            <p>
                Once we receive and inspect your item, we will notify you on the status of your
                refund. If approved, we will initiate a refund to your original method of
                payment (Bank Transfer, eSewa, or Khalti) within 5-10 business days.
            </p>
        </LegalLayout>
    );
}
