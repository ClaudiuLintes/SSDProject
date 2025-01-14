import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCard.css';

const ProductCard = ({ product }) => {
    const {
        id,
        image = 'https://via.placeholder.com/200',
        title = 'Default Product',
        inStock = false,
        price = '0.00',
        oldPrice = '0.00',
        category = 'internal'
    } = product;

    return (
        <Link to={`/${category}/${id}`} className="product-main-card">
            <img src={image} alt={title} className="product-main-image" />
            <h2 className="product-main-title">{title}</h2>
            {oldPrice > 0 && (
                <p className="product-main-old-price">${oldPrice}</p>
            )}
            <p className="product-main-price">${price}</p>
            <p className={`product-main-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button onClick={(e) => {}} className="product-main-add-to-cart-button">
                Add to Cart
            </button>
        </Link>
    );
};

export default ProductCard;
