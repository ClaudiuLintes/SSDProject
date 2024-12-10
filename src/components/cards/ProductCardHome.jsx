import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardHome.css';

const ProductCardHome = ({
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
        <Link to={`/${category}/${id}`} className="ProductCardHome-product-card">
            <img src={image} alt={title} className="ProductCardHome-product-image" />
            <h2 className="ProductCardHome-product-title">{title}</h2>
            {oldPrice > 0 && (
                <p className="ProductCardHome-product-old-price">${oldPrice}</p>
            )}
            <p className="ProductCardHome-product-price">${price}</p>
            <p className={`ProductCardHome-product-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button onClick={(e) => { e.preventDefault(); addToCart(); }} className="ProductCardHome-add-to-cart-button">
                Add to Cart
            </button>
        </Link>
    );
};

export default ProductCardHome;
