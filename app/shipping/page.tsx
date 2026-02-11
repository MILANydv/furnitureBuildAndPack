import LegalLayout from '@/components/layout/LegalLayout';

export default function ShippingPage() {
  return (
    <LegalLayout>
      <h1>Shipping & Delivery</h1>
      <p>
        At ModuLiving, we strive to deliver your modular furniture in the safest and most efficient 
        manner possible. We use specialized furniture couriers as well as our own dedicated fleet 
        for Kathmandu Valley deliveries.
      </p>

      <h2>Delivery Zones & Fees</h2>
      <ul>
        <li><strong>Inside Kathmandu Valley:</strong> Free delivery on all orders above NPR 10,000. A flat fee of NPR 500 applies to smaller orders.</li>
        <li><strong>Major Cities (Pokhara, Narayangadh, Butwal):</strong> Calculated at checkout based on volume. Usually ranges between NPR 1,500 - 3,500.</li>
        <li><strong>Remote Areas:</strong> Please contact our support team for a custom quote.</li>
      </ul>

      <h2>Delivery Timelines</h2>
      <p>
        Most "In-Stock" items are dispatched within 24-48 hours. Custom configuration items 
        require 10-14 days for precision manufacturing.
      </p>
      
      <h2>White Glove Service</h2>
      <p>
        Our white-glove delivery includes carrying the items into your room of choice, 
        unpacking, and disposing of all packaging materials. Professional assembly 
        can be added for a small additional fee.
      </p>
    </LegalLayout>
  );
}
