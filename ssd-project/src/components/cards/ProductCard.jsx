import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCard.css';

const ProductCard = ({
    id,
    image = 'https://via.placeholder.com/200',
    title = 'Default Product',
    inStock = false,
    price = '0.00',
    oldPrice = '0.00',
    category = 'internal', // Add category prop
    addToCart
}) => {
    return (
        <Link to={`/${category}/${id}`} className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h2 className="product-title">{title}</h2>
            {oldPrice > 0 && (
                <p className="product-old-price">${oldPrice}</p>
            )}
            <p className="product-price">${price}</p>
            <p className={`product-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button onClick={(e) => { e.preventDefault(); addToCart(); }} className="add-to-cart-button">
                Add to Cart
            </button>
        </Link>
    );
};

export default ProductCard;
