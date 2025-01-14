import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import OrderFilterMenu from './OrderFilterMenu';
import '../../css/orders/OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]); // Original orders from Firestore
    const [displayOrders, setDisplayOrders] = useState([]); // Filtered/sorted orders for display
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [errorMessage, setErrorMessage] = useState(''); // Error handling

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;
            if (!user) {
                setErrorMessage('User not logged in.');
                return;
            }

            try {
                const ordersQuery = query(collection(db, 'orders'), where('userId', '==', user.uid));
                const querySnapshot = await getDocs(ordersQuery);
                const ordersData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setOrders(ordersData);
                setDisplayOrders(ordersData); // Initialize displayOrders
            } catch (error) {
                console.error('Error fetching orders:', error);
                setErrorMessage('Failed to load orders. Please try again later.');
            }
        };

        fetchOrders();
    }, []); // Empty dependency array ensures fetch only runs on component mount

    const filterOrders = (afterDate, beforeDate) => {
        const filtered = orders.filter(order => {
            const orderDate = new Date(order.date);
            const after = afterDate ? new Date(afterDate) : null;
            const before = beforeDate ? new Date(beforeDate) : null;
            return (!after || orderDate >= after) && (!before || orderDate <= before);
        });

        setDisplayOrders(filtered);
    };

    const sortOrders = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedOrders = [...displayOrders].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });

        setDisplayOrders(sortedOrders);
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 1:
                return 'order-status-canceled';
            case 2:
                return 'order-status-ongoing';
            case 3:
                return 'order-status-delivered';
            default:
                return 'order-status-unknown';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return 'Canceled';
            case 2:
                return 'Ongoing';
            case 3:
                return 'Delivered';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="orderList-container">
            <h1>My Orders</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <OrderFilterMenu filterOrders={filterOrders} />
            {displayOrders.length > 0 ? (
                <table className="orderList-table">
                    <thead>
                        <tr>
                            <th onClick={() => sortOrders('crt')}>Num{getArrow('crt')}</th>
                            <th onClick={() => sortOrders('id')}>Order #{getArrow('id')}</th>
                            <th onClick={() => sortOrders('date')}>Date{getArrow('date')}</th>
                            <th onClick={() => sortOrders('totalValue')}>Value{getArrow('totalValue')}</th>
                            <th onClick={() => sortOrders('status')}>Status{getArrow('status')}</th>
                            <th onClick={() => sortOrders('courierChoice')}>Delivery Details{getArrow('courierChoice')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayOrders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/order/${order.id}`}>{order.id}</Link>
                                </td>
                                <td>{order.date}</td>
                                <td>${order.totalValue.toFixed(2)}</td>
                                <td className={getStatusClassName(order.status)}>{getStatusText(order.status)}</td>
                                <td>{order.courierChoice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders to display.</p>
            )}
        </div>
    );
};

export default OrderList;
