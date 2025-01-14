import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardOrder.css';

const categoryLinks = {
    "Internal SSDs": "internal-ssds",
    "External SSDs": "external-ssds",
    "Software": "ssd-software",
    "SSD Accessories": "ssd-accessories"
};

const ProductCardOrder = ({
    id,
    image = 'https://via.placeholder.com/200',
    title = 'Default Product',
    quantity = 1,
    price = '0.00',
    category = 'internal'
}) => {
    const totalPrice = (price * quantity).toFixed(2);
    const categoryLink = categoryLinks[category] || category;

    return (
        <div className="ProductCardOrder-product-card">
            <Link to={`/${categoryLink}/${id}`} className="ProductCardOrder-product-image-link">
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
