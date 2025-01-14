import React from 'react';
import ProductCardOrder from '../cards/ProductCardOrder';
import '../../css/orders/OrderInfo.css';

const OrderInfo = ({
    deliveryOption,
    courierChoice,
    deliveryAddress,
    billingAddress,
    paymentMethod,
    products,
    shippingCost,
    discount,
    orderCost,
    firstName,
    lastName,
    phone,
    email,
    totalValue
}) => {

    return (
        <div className="orderInfo-container">
            <div className="orderInfo-details">
                <div className="orderInfo-item">
                    <h3>Delivery Option:</h3>
                    <p>{deliveryOption}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Courier Choice:</h3>
                    <p>{courierChoice}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>First Name:</h3>
                    <p>{firstName || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Last Name:</h3>
                    <p>{lastName || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Phone:</h3>
                    <p>{phone || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Email:</h3>
                    <p>{email || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Delivery Address:</h3>
                    <p>{deliveryAddress || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Billing Address:</h3>
                    <p>{billingAddress || "/"}</p>
                </div>
                <div className="orderInfo-item">
                    <h3>Payment Method:</h3>
                    <p>{paymentMethod}</p>
                </div>
            </div>
            <div className="orderInfo-products">
                {products.map((product) => (
                    <ProductCardOrder key={product.id} {...product} />
                ))}
            </div>
            <div className="orderInfo-cost">
                <h3>Order Cost :</h3>
                <p>${(orderCost + discount).toFixed(2)}</p>
            </div>
            <div className="orderInfo-shipping">
                <h3>Shipping Fees:</h3>
                <p>${shippingCost.toFixed(2)}</p>
            </div>
            {discount > 0 &&
                <div className="orderInfo-discount">
                    <h3>Discount :</h3>
                    <p>-${discount.toFixed(2)}</p>
                </div>
            }
            <div className="orderInfo-total">
                <h3>Total Value:</h3>
                <p>${totalValue.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderInfo;
