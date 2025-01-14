import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../firebase';
import { collection, addDoc, orderBy, query, limit, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import '../../css/basket/OrderForm.css';

const OrderForm = ({ basketProducts, shippingCost = -1, orderCost = -1, discount = -1 }) => {
    const [deliveryOption, setDeliveryOption] = useState('');
    const [courier, setCourier] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [copyAddress, setCopyAddress] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [lastOrderNumber, setLastOrderNumber] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const user = auth.currentUser;

    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const userFirstName = data.firstName || '';
                        const userLastName = data.lastName || '';
                        const userAddress = data.address || '';
                        const userPhone = data.phone || '';
                        const userEmail = data.email || '';

                        // Set individual fields
                        setFirstName(userFirstName);
                        setLastName(userLastName);
                        setAddress(userAddress);
                        setPhone(userPhone);
                        setEmail(userEmail);

                        // Pre-fill delivery address with the user's address
                        setDeliveryAddress(userAddress);
                    } else {
                        console.log('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching document:', error);
                }
            }
        };

        fetchData();
    }, [user]);


    useEffect(() => {
        const fetchLastOrderNumber = async () => {
            try {
                const ordersCollection = collection(db, 'orders');
                const ordersQuery = query(ordersCollection, orderBy('id', 'desc'), limit(1));
                const querySnapshot = await getDocs(ordersQuery);

                if (!querySnapshot.empty) {
                    const lastOrder = querySnapshot.docs[0].data();
                    // Extract the numeric part of the last order ID and parse it as a hexadecimal number
                    const lastOrderHex = lastOrder.id.replace('ORD', '');
                    const lastOrderNum = parseInt(lastOrderHex, 16);
                    setLastOrderNumber(lastOrderNum);
                }
            } catch (error) {
                console.error('Error fetching last order number:', error);
            }
        };

        fetchLastOrderNumber();
    }, []);

    const generateOrderId = () => {
        // Increment the last order number and convert it back to a padded hexadecimal string
        const newOrderNumber = (lastOrderNumber + 1).toString(16).padStart(6, '0').toUpperCase();
        return `ORD${newOrderNumber}`;
    };

    const handleOrder = async () => {
        if (!deliveryOption || !deliveryAddress || (!copyAddress && !billingAddress) || !paymentMethod || !firstName || !lastName || !phone || !email) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }

        if (deliveryOption === 'Home delivery' && !courier) {
            setErrorMessage('Please select a courier for Home delivery.');
            return;
        }

        const user = auth.currentUser;
        if (user) {
            const order = {
                id: generateOrderId(),
                userId: user.uid,
                date: new Date().toISOString().split('T')[0],
                totalValue: shippingCost + orderCost,
                orderCost: orderCost,
                shippingCost: shippingCost,
                discount: discount,
                deliveryOption,
                deliveryAddress,
                billingAddress: copyAddress ? deliveryAddress : billingAddress,
                paymentMethod,
                status: 2,
                products: basketProducts,
                courierChoice: deliveryOption === 'Home delivery' ? courier : 'Pick-up box',
                customerDetails: {
                    firstName,
                    lastName,
                    phone,
                    email
                }
            };

            const basketCollectionRef = collection(db, 'basket', user.uid, 'basket');
            const basketSnapshot = await getDocs(basketCollectionRef);
            const deletePromises = basketSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            try {
                await addDoc(collection(db, 'orders'), order);
                alert('Order placed successfully!');
                // Reset form
                setDeliveryOption('');
                setCourier('');
                setDeliveryAddress('');
                setBillingAddress('');
                setCopyAddress(false);
                setPaymentMethod('');
                setErrorMessage('');
                setLastOrderNumber((prev) => prev + 1); // Update the lastOrderNumber state locally
            } catch (error) {
                setErrorMessage('Failed to place order. Please try again.');
                console.error('Error adding order: ', error);
            }
        } else {
            setErrorMessage('You must be logged in to place an order.');
        }
    };

    const handleCopyAddress = () => {
        if (copyAddress) {
            setBillingAddress(deliveryAddress);
        } else {
            setBillingAddress('');
        }
    };

    return (
        <div className="orderForm-container">
            <h2>Order Summary</h2>
            <table className="orderForm-product-table">
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Title</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {basketProducts.map(product => (
                        <tr key={product.id}>
                            <td><img src={product.image} alt={product.title} className="orderForm-product-image" /></td>
                            <td>{product.title}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2) * product.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Delivery Options</h3>
            <div className="orderForm-delivery-options">
                <label>
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Home delivery"
                        checked={deliveryOption === 'Home delivery'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    />
                    Home delivery
                </label>
                <label>
                    <input
                        type="radio"
                        name="deliveryOption"
                        value="Pick-up box"
                        checked={deliveryOption === 'Pick-up box'}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                    />
                    Pick-up box
                </label>
            </div>

            {deliveryOption === 'Home delivery' && (
                <>
                    <h3>Courier Choice</h3>
                    <div className="orderForm-courier-choice">
                        <label>
                            <input
                                type="radio"
                                name="courier"
                                value="FastTrack Delivery"
                                checked={courier === 'FastTrack Delivery'}
                                onChange={(e) => setCourier(e.target.value)}
                            />
                            FastTrack Delivery
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courier"
                                value="QuickShip Express"
                                checked={courier === 'QuickShip Express'}
                                onChange={(e) => setCourier(e.target.value)}
                            />
                            QuickShip Express
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courier"
                                value="Speedy Couriers"
                                checked={courier === 'Speedy Couriers'}
                                onChange={(e) => setCourier(e.target.value)}
                            />
                            Speedy Couriers
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="courier"
                                value="Reliable Delivery Co."
                                checked={courier === 'Reliable Delivery Co.'}
                                onChange={(e) => setCourier(e.target.value)}
                            />
                            Reliable Delivery Co.
                        </label>
                    </div>
                </>
            )}

            <div className="orderForm-personal-details">
                <h3>Your Details</h3>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="orderForm-input"
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="orderForm-input"
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="orderForm-input"
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="orderForm-input"
                    />
                </label>
            </div>


            <h3>Delivery Address</h3>
            <textarea
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                    setDeliveryAddress(e.target.value)
                }}
                placeholder=""
                className="orderForm-textarea"
            />

            <h3>Billing Address</h3>
            <label className="orderForm-checkbox-label">
                <input
                    type="checkbox"
                    checked={copyAddress}
                    onChange={(e) => { setCopyAddress(e.target.checked); handleCopyAddress(); }}
                />
                <span className="orderForm-custom-checkbox"></span>
                Same as Delivery Address
            </label>
            <textarea
                value={copyAddress ? deliveryAddress : billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="Enter Billing Address"
                disabled={copyAddress}
                className="orderForm-textarea"
            />

            <h3>Payment Method</h3>
            <div className="orderForm-payment-methods">
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Cash on Delivery"
                        checked={paymentMethod === 'Cash on Delivery'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Cash on Delivery
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Credit Card (Visa, MasterCard)"
                        checked={paymentMethod === 'Credit Card (Visa, MasterCard)'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Credit Card (Visa, MasterCard)
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Bank Transfer"
                        checked={paymentMethod === 'Bank Transfer'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Bank Transfer
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === 'PayPal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    PayPal
                </label>
                <label>
                    <input
                        type="radio"
                        name="paymentMethod"
                        value="Financing Options"
                        checked={paymentMethod === 'Financing Options'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    Financing Options (split the payment over multiple months)
                </label>
            </div>

            {errorMessage && <p className="orderForm-error-message">{errorMessage}</p>}
            <button onClick={handleOrder} className="orderForm-submit-button">Order</button>
        </div>
    );
};

export default OrderForm;
