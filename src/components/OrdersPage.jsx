import React from 'react';
import OrderFilterMenu from './orders/OrderFilterMenu'; // Ensure the path is correct
import OrderList from './orders/OrderList'; // Ensure the path is correct
import '../css/OrdersPage.css';

const OrdersPage = () => {
    return (
        <div className="ordersPage-container">
            <div className="ordersPage-card">
                <OrderList />
            </div>
        </div>
    );
}

export default OrdersPage;
