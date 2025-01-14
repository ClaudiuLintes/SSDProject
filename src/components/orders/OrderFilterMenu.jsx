import React, { useState } from 'react';
import '../../css/orders/OrderFilterMenu.css'

const OrderFilterMenu = ({ filterOrders }) => {
    const [afterDate, setAfterDate] = useState('');
    const [beforeDate, setBeforeDate] = useState('');

    const handleFilter = () => {
        filterOrders(afterDate, beforeDate);
    };

    return (
        <div className="orderFilterMenu-container">
            <h3>Filter Orders by Date</h3>
            <div className="orderFilterMenu-form-group">
                <label>
                    After Date
                    <input 
                        type="date" 
                        value={afterDate} 
                        onChange={(e) => setAfterDate(e.target.value)} 
                    />
                </label>
            </div>
            <div className="orderFilterMenu-form-group">
                <label>
                    Before Date
                    <input 
                        type="date" 
                        value={beforeDate} 
                        onChange={(e) => setBeforeDate(e.target.value)} 
                    />
                </label>
            </div>
            <button onClick={handleFilter} className="orderFilterMenu-submit-button">Apply Filters</button>
        </div>
    );
};

export default OrderFilterMenu;
