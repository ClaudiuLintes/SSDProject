import React from 'react';
import '../css/Info.css';

const Info = () => {
    return (
        <div className="info-page">
            <h1>Info Page</h1>

            <section className="contact-us">
                <h2>Contact Us</h2>
                <h3>Contact</h3>
                <p>For all contact information, please visit our <a href="/contact">Contact Page</a>. Our contact page provides detailed information on how to reach us for various needs.</p>

                <h3>Departments</h3>
                <ul>
                    <li>Sales Department</li>
                    <li>Customer Support Department</li>
                    <li>Billing Department</li>
                </ul>
                <p>For detailed contact information for each department, please visit our <a href="/contact">Contact Page</a>.</p>
            </section>

            <section className="orders">
                <h2>Orders</h2>
                <h3>Order Status</h3>
                <p>Check the status of your order by logging into your account and visiting the order history section.</p>

                <h3>Delivery Times</h3>
                <p>Delivery times may vary (usually 1-3 working days). You will be able to see the progress of your delivery in the order history section.</p>

                <h3>Canceling an Order</h3>
                <p>To cancel an order, please contact our customer support as soon as possible.</p>

                <h3>How to Order</h3>
                <p>To place an order, simply add items to your cart, proceed to checkout, and follow the prompts.</p>

                <h3>Extended Warranty</h3>
                <p>We offer extended warranty options for many of our products. Please see the product page for details.</p>

                <h3>Product Stock</h3>
                <p>Product availability is updated in real-time on our website. Out-of-stock items will be marked accordingly.</p>

                <h3>Special Deals</h3>
                <p>Check our <a href="/special-deals">Special Deals</a> section regularly for exclusive offers and discounts.</p>
            </section>

            <section className="returns-warranties">
                <h2>Returns and Warranties</h2>
                <h3>Return Policy</h3>
                <p>Our return policy allows returns within 14 days of product arrival. Please ensure the product is in its original condition.</p>

                <h3>Warranty Policy</h3>
                <p>Certain products, such as software, may not come with a warranty. To process a warranty claim, you will need the Warranty Certificate and a Purchase Bill or Receipt.</p>

                <h3>How to Start a Return or Warranty Process</h3>
                <p>To start a return or warranty process, please visit our <a href="/customer-support">Customer Support</a> page and submit a ticket through our system.</p>
            </section>

            <section className="delivery">
                <h2>Delivery</h2>
                <h3>Methods</h3>
                <p>We offer various delivery methods including home delivery and delivery to pick-up boxes.</p>

                <h3>Costs</h3>
                <p>Shipping fees are calculated at checkout based on your location and the delivery method chosen. Orders over 50$ benefit of free delivery</p>

                <h3>"Open the Package at Delivery" Service</h3>
                <p>We offer an "Open the Package at Delivery" service to ensure you receive your items in perfect condition.</p>

                <h3>Courier List</h3>
                <p>We work with several couriers, including:</p>
                <ul>
                    <li>FastTrack Delivery</li>
                    <li>QuickShip Express</li>
                    <li>Speedy Couriers</li>
                    <li>Reliable Delivery Co.</li>
                </ul>
            </section>

            <section className="payment-methods">
                <h2>Payment Methods</h2>
                <ul>
                    <li>Cash on Delivery</li>
                    <li>Credit Card (Visa, MasterCard)</li>
                    <li>Bank Transfer</li>
                    <li>PayPal</li>
                    <li>Financing Options (split the payment over multiple months)</li>
                </ul>
            </section>
        </div>
    );
}

export default Info;
