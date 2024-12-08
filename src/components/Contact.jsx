import React from 'react';
import '../css/Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <h1>Contact Page</h1>

            <section className="description">
                <p>Welcome to our Contact Page. Here, you can find all the necessary details to reach out to us for various needs, whether it's sales inquiries, customer support, or general information about our store. Our team is dedicated to providing you with excellent service and support.</p>
            </section>

            <section className="store-hours">
                <h2>Store Hours Schedule</h2>
                <ul>
                    <li>Sales Department: 08:00 - 18:00 (Mon-Fri)</li>
                    <li>Customer Support Department: 08:00 - 20:00 (Mon-Sat)</li>
                    <li>Billing Department: 10:00 - 16:00 (Mon-Fri)</li>
                </ul>
            </section>

            <section className="contact-details">
                <h2>Contact Details</h2>
                <p>Address: 1234 Tech Drive, Innovation City, 56789</p>
                <ul>
                    <li>Sales Department: Phone: (555) 123-4567, Email: sales@projectssd.com</li>
                    <li>Customer Support Department: Phone: (555) 234-5678, Email: support@projectssd.com</li>
                    <li>Billing Department: Phone: (555) 456-7890, Email: billing@projectssd.com</li>
                </ul>
                <p>Phone: (555) 123-4567</p>
                <p>Fax: (555) 987-6543</p>
            </section>

            <section className="additional-info">
                <p>For more detailed assistance, please visit our <a href="/customer-support">Customer Support</a> page. Our Customer Support team is also a valuable resource to help resolve any issues or answer any questions you may have.</p>
            </section>
        </div>
    );
}

export default Contact;
