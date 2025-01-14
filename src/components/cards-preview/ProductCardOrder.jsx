import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardOrder.css';

const ProductCardOrder = ({ product }) => {
    const {
        id,
        image = 'https://via.placeholder.com/200',
        title = 'Default Product',
        quantity = 1,
        price = '0.00',
        category = 'internal'
    } = product;

    const totalPrice = (price * quantity).toFixed(2);

    return (
        <div className="ProductCardOrder-product-card">
            <Link to={`/${category}/${id}`} className="ProductCardOrder-product-image-link">
                <img src={image} alt={title} className="ProductCardOrder-product-image" />
            </Link>
            <div className="ProductCardOrder-details">
                <h2 className="ProductCardOrder-product-title">{title}</h2>
                <div className="ProductCardOrder-price-container">
                    <p className="ProductCardOrder-product-price">${totalPrice}</p>
                    <p className="ProductCardOrder-product-quantity">Qty: {quantity}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCardOrder;
