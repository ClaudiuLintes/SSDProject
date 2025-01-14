import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import '../../css/basket/BasketSummaryMenu.css';

const discountCodes = {
    'UPT10': 10,
    'UPT25': 25,
    'UPT50': 50,
};

const BasketSummaryMenu = ({ products, onQuantityChange, shippingCost = 15.00 }) => {
    const [code, setCode] = useState('');
    const [appliedCode, setAppliedCode] = useState('');
    const [discount, setDiscount] = useState(0);

    const navigate = useNavigate();

    // Calculate total price
    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    };

    const [totalPrice, setTotalPrice] = useState(calculateTotal());

    useEffect(() => {
        setTotalPrice(calculateTotal());
    }, [products]); // Recalculate total whenever products change

    const shipping = totalPrice > 50 ? 0 : shippingCost;
    const discountedAmount = totalPrice * (discount / 100);
    const discountedPrice = (totalPrice - discountedAmount).toFixed(2);

    const handleApplyCode = () => {
        if (discountCodes[code]) {
            const appliedDiscount = Math.min(discountCodes[code], 90); // Ensure discount does not exceed 90%
            setDiscount(appliedDiscount);
            setAppliedCode(code);
        } else {
            alert('Invalid discount code');
            setDiscount(0);  // Reset discount if code is invalid
            setAppliedCode('');  // Reset applied code if invalid
        }
    };

    const handleRemoveCode = () => {
        setCode('');
        setAppliedCode('');
        setDiscount(0);
    };

    const handleCheckout = async () => {
        // Save the cost and shipping cost in Firestore
        const user = auth.currentUser;
        if (user) {
            try {
                const userDocRef = doc(db, 'basket', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {}); // Create the document if it doesn't exist
                }
                await updateDoc(userDocRef, {
                    cost: parseFloat(discountedPrice),
                    discount: parseFloat(discountedAmount),
                    shippingcost: parseFloat(shipping.toFixed(2))
                });
                navigate('/order-details'); // Navigate to the Order page
            } catch (error) {
                console.error('Error updating cost and shipping cost: ', error);
                alert('Failed to proceed to checkout');
            }
        } else {
            navigate('/order-details'); // Navigate to the Order page even if user is not authenticated
        }
    };

    return (
        <div className="BasketSummaryMenu">
            <h2>Summary</h2>
            <p>Item(s): ${discountedPrice}</p>
            {discount > 0 && (
                <p className="discounted-amount">Discount: -${discountedAmount.toFixed(2)}</p>
            )}
            <p>
                Shipping:
                <span className={shipping === 0 ? "free-shipping" : ""}>
                    {shipping === 0 ? " Free" : ` $${shipping.toFixed(2)}`}
                </span>
            </p>
            {appliedCode && (
                <p className="current-code" onClick={handleRemoveCode}>
                    Code: {appliedCode} (Click to remove)
                </p>
            )}
            <div className="discount-code-container">
                <input
                    type="text"
                    placeholder="Enter ClientDealCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={handleApplyCode}>Apply</button>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>Proceed to checkout</button>
        </div>
    );
};

export default BasketSummaryMenu;
