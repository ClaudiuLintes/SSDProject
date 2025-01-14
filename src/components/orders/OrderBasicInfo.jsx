import React from 'react';
import '../../css/orders/OrderBasicInfo.css'; // Make sure to create this CSS file

const OrderBasicInfo = ({ date, totalValue }) => {
    return (
        <div className="orderBasicInfo-container">
            <div className="orderBasicInfo-item">
                <h3>Order Date:</h3>
                <p>{date}</p>
            </div>
            <div className="orderBasicInfo-item">
                <h3>Total Value:</h3>
                <p>${totalValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderBasicInfo;
