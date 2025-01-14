import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import '../../css/basket/OrderSummary.css';

const OrderSummary = ({ products }) => {
    const [cost, setCost] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderSummary = async () => {
            const user = auth.currentUser;
            if (user) {
                try {
                    const userDocRef = doc(db, 'basket', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setCost(userDoc.data().cost || 0);
                        setShippingCost(userDoc.data().shippingcost || 0);
                        setDiscount(userDoc.data().discount || 0);
                    }
                } catch (error) {
                    console.error('Error fetching order summary: ', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOrderSummary();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    const discountedPrice = cost;

    return (
        <div className="OrderSummary">
            <h2>Summary</h2>
            <p>Item(s): ${discountedPrice.toFixed(2)}</p>
            {discount > 0 && (
                <p className="order-discounted-amount">Discount: -${discount.toFixed(2)}</p>
            )}
            <p>
                Shipping:
                <span className={shippingCost === 0 ? "order-free-shipping" : ""}>
                    {shippingCost === 0 ? " Free" : ` $${shippingCost.toFixed(2)}`}
                </span>
            </p>
        </div>
    );
};

export default OrderSummary;
