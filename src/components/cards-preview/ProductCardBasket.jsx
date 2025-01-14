import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardBasket.css';

const ProductCardBasket = ({ product }) => {
    const {
        id,
        image = 'https://via.placeholder.com/200',
        title = 'Default Product',
        inStock = false,
        price = '0.00',
        oldPrice = '0.00',
        category = 'internal',
    } = product;

    return (
        <Link to={`/${category}/${id}`} className="ProductCardBasket-product-card">
            <img src={image} alt={title} className="ProductCardBasket-product-image" />
            <div className="ProductCardBasket-details">
                <h2 className="ProductCardBasket-product-title">{title}</h2>
                <p className={`ProductCardBasket-product-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                    {inStock ? 'In Stock' : 'Out of Stock'}
                </p>
            </div>
            <div className="ProductCardBasket-price-container">
                {oldPrice > 0 ? (
                    <p className="ProductCardBasket-product-old-price">${oldPrice}</p>
                ) : (
                    <div className="ProductCardBasket-placeholder-price"></div>
                )}
                <p className="ProductCardBasket-product-price">${price}</p>
                <button onClick={(e) => {}} className="ProductCardBasket-remove-from-cart-button">
                    Remove
                </button>
            </div>
        </Link>
    );
};

export default ProductCardBasket;
