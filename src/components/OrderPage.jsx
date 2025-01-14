import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure the path is correct
import OrderBasicInfo from './orders/OrderBasicInfo';
import OrderInfo from './orders/OrderInfo';
import '../css/OrderPage.css'; // Make sure to create this CSS file
import adminIdList from './auth/AdminIdList'; // Ensure this file contains the list of admin IDs

const OrderPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const user = auth.currentUser;
                if (!user) {
                    setError('You need to be logged in to view this page');
                    setLoading(false);
                    return;
                }

                const ordersQuery = query(collection(db, 'orders'), where('id', '==', orderId));
                const querySnapshot = await getDocs(ordersQuery);

                if (!querySnapshot.empty) {
                    const docSnap = querySnapshot.docs[0];
                    const orderData = { id: docSnap.id, ...docSnap.data() };

                    if (orderData.userId === user.uid || adminIdList.includes(user.uid)) {
                        setOrder(orderData);
                    } else {
                        setError('Order not found');
                    }
                } else {
                    setError(`Order not found: ${orderId}`);
                }
            } catch (error) {
                setError(`Failed to fetch order: ${orderId}`);
                console.error('Error fetching order:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <Navigate to="/not-found" />;
    }

    if (!order) {
        return <Navigate to="/not-found" />;
    }

    return (
        <div className="orderPage-container">
            <h1>Order #{order.id}</h1>
            <OrderBasicInfo date={order.date} totalValue={order.totalValue} />
            <h2>Products shipped by: {order.courierChoice}</h2>
            <OrderInfo
                deliveryOption={order.deliveryOption}
                courierChoice={order.courierChoice}
                deliveryAddress={order.deliveryAddress}
                billingAddress={order.billingAddress}
                paymentMethod={order.paymentMethod}
                products={order.products}
                shippingCost={order.shippingCost || 0}
                discount={order.discount || 0}
                orderCost={order.orderCost}
                totalValue={order.totalValue}
                firstName={order.customerDetails.firstName}
                lastName={order.customerDetails.lastName}
                phone={order.customerDetails.phone}
                email={order.customerDetails.email}
            />
        </div>
    );
};

export default OrderPage;
