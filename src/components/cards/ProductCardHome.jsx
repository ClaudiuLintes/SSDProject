import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards/ProductCardHome.css';

const categoryLinks = {
    "Internal SSDs": "internal-ssds",
    "External SSDs": "external-ssds",
    "Software": "ssd-software",
    "SSD Accessories": "ssd-accessories"
};

const ProductCardHome = ({
    id,
    image = 'https://via.placeholder.com/200',
    title = 'Default Product',
    inStock = false,
    price = '0.00',
    oldPrice = '0.00',
    category = 'internal',
    addToCart
}) => {
    const categoryLink = categoryLinks[category] || category;

    const handleAddToCart = (e) => {
        if (!inStock) {
            e.preventDefault();
        } else {
            e.preventDefault();
            addToCart(id);
        }
    };

    return (
        <Link to={`/${categoryLink}/${id}`} className="ProductCardHome-product-card">
            <img src={image} alt={title} className="ProductCardHome-product-image" />
            <h2 className="ProductCardHome-product-title">{title}</h2>
            {oldPrice > 0 && (
                <p className="ProductCardHome-product-old-price">${oldPrice}</p>
            )}
            <p className="ProductCardHome-product-price">${price}</p>
            <p className={`ProductCardHome-product-stock ${inStock ? 'in-stock' : 'out-of-stock'}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button
                onClick={handleAddToCart}
                className={`ProductCardHome-add-to-cart-button ${!inStock ? 'disabled' : ''}`}
            >
                Add to Cart
            </button>
        </Link>
    );
};

export default ProductCardHome;
