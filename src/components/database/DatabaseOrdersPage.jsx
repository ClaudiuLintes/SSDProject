import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import OrderFilterMenu from '../orders/OrderFilterMenu';
import '../../css/database/DatabaseOrdersPage.css';

const DatabaseOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'orders'));
                const ordersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersList);
                setFilteredOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const filterOrders = (afterDate, beforeDate) => {
        const filtered = orders.filter(order => {
            const orderDate = new Date(order.date);
            const after = new Date(afterDate);
            const before = new Date(beforeDate);
            return (!afterDate || orderDate >= after) && (!beforeDate || orderDate <= before);
        });
        setFilteredOrders(filtered);
    };

    const sortOrders = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedOrders = [...filteredOrders].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setFilteredOrders(sortedOrders);
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    const getStatusText = (status) => {
        switch (status) {
            case 1: return 'Canceled';
            case 2: return 'Ongoing';
            case 3: return 'Delivered';
            default: return 'Unknown';
        }
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 1: return 'order-status-canceled';
            case 2: return 'order-status-ongoing';
            case 3: return 'order-status-delivered';
            default: return 'order-status-unknown';
        }
    };

    const updateStatus = async (order, action) => {
        let updatedStatus = order.status;
        if (action === 'increase' && order.status < 3) {
            updatedStatus += 1;
        }
        if (action === 'decrease' && order.status > 1) {
            updatedStatus -= 1;
        }

        try {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            const orderDoc = querySnapshot.docs.find(doc => doc.data().id === order.id);

            if (orderDoc) {
                await updateDoc(doc(db, 'orders', orderDoc.id), { status: updatedStatus });

                const updatedOrders = orders.map((o) => (o.id === order.id ? { ...o, status: updatedStatus } : o));
                setOrders(updatedOrders);
                setFilteredOrders(updatedOrders);
            } else {
                console.error('Order document not found');
            }
        } catch (error) {
            console.error('Error updating order status: ', error);
        }
    };


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="databaseOrdersPage-container">
            <div className="databaseOrderPage-buttons">
                <Link to="/database" className="databaseOrderPage-button">Database Control Panel</Link>
            </div>
            <h1>Database Order List</h1>
            <OrderFilterMenu filterOrders={filterOrders} />
            <table className="databaseOrdersPage-table">
                <thead>
                    <tr>
                        <th onClick={() => sortOrders('crt')}>Number{getArrow('crt')}</th>
                        <th onClick={() => sortOrders('id')}>Order #{getArrow('id')}</th>
                        <th onClick={() => sortOrders('date')}>Date{getArrow('date')}</th>
                        <th onClick={() => sortOrders('value')}>Value{getArrow('value')}</th>
                        <th>Status</th>
                        <th onClick={() => sortOrders('deliveryDetails')}>Delivery Details{getArrow('deliveryDetails')}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrders.map((order, index) => (
                        <tr key={order.id}>
                            <td>{index + 1}</td>
                            <td><Link to={`/order/${order.id}`}>{order.id}</Link></td>
                            <td>{order.date}</td>
                            <td>${order.totalValue.toFixed(2)}</td>
                            <td className={getStatusClassName(order.status)}>
                                {getStatusText(order.status)}
                                {order.status !== 3 && (
                                    <>
                                        <button onClick={() => updateStatus(order, 'decrease')} disabled={order.status === 1}>
                                            ⯇
                                        </button>
                                        <button onClick={() => updateStatus(order, 'increase')} disabled={order.status === 3}>
                                            ⯈
                                        </button>
                                    </>
                                )}
                            </td>
                            <td>{order.deliveryOption} / {order.courierChoice}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatabaseOrdersPage;
