import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardBasket.css';

const categoryLinks = {
    "Internal SSDs": "internal-ssds",
    "External SSDs": "external-ssds",
    "Software": "ssd-software",
    "SSD Accessories": "ssd-accessories"
};

const ProductCardBasket = ({
    id,
    image = 'https://via.placeholder.com/200',
    title = 'Default Product',
    inStock = false,
    price = 0.00,
    oldPrice = 0.00,
    category = 'internal',
    quantity: initialQuantity = 1,
    removeFromCart,
    updateQuantity
}) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncreaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantity(id, newQuantity);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantity(id, newQuantity);
        }
    };

    const categoryLink = categoryLinks[category] || category;
    const totalPrice = (price * quantity).toFixed(2);

    return (
        <div className="ProductCardBasket-product-card">
            <img src={image} alt={title} className="ProductCardBasket-product-image" />
            <div className="ProductCardBasket-details">
                <Link to={`/${categoryLink}/${id}`} className="ProductCardBasket-product-link">
                    <h2 className="ProductCardBasket-product-title">{title}</h2>
                </Link>
                <p className={`ProductCardBasket-product-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </p>
            </div>
            <div className="ProductCardBasket-price-container">
                {oldPrice > 0 && (
                    <p className="ProductCardBasket-product-old-price">${oldPrice.toFixed(2)}</p>
                )}
                <p className="ProductCardBasket-product-price">${totalPrice}</p>
                <div className="ProductCardBasket-quantity-container">
                    <button onClick={handleDecreaseQuantity} className="ProductCardBasket-quantity-button">-</button>
                    <span className="ProductCardBasket-quantity">{quantity}</span>
                    <button onClick={handleIncreaseQuantity} className="ProductCardBasket-quantity-button">+</button>
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(id);
                    }}
                    className="ProductCardBasket-remove-from-cart-button"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default ProductCardBasket;
