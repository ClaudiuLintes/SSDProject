import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../../../context/BasketContext';
import '../../../css/products/productPage/ProductMenu.css';

const categoryLinks = {
    "Internal SSDs": "internal-ssds",
    "External SSDs": "external-ssds",
    "Software": "ssd-software",
    "SSD Accessories": "ssd-accessories"
};

const ProductMenu = ({ product, siblings }) => {
    const { addToCart } = useBasket(); // Get addToCart function from BasketContext
    const navigate = useNavigate();
    const [currentColor, setCurrentColor] = useState(product.color);
    const [currentSize, setCurrentSize] = useState(product.size);

    const handleColorChange = (color) => {
        const sibling = siblings.find(sibling => sibling.color === color && sibling.size === currentSize);
        if (sibling) {
            setCurrentColor(color);
            navigate(`/${categoryLinks[sibling.category] || sibling.category}/${sibling.id}`);
        }
    };

    const handleSizeChange = (size) => {
        const sibling = siblings.find(sibling => sibling.size === size && sibling.color === currentColor);
        if (sibling) {
            setCurrentSize(size);
            navigate(`/${categoryLinks[sibling.category] || sibling.category}/${sibling.id}`);
        }
    };

    // Helper function to generate buttons for sibling products
    const renderSiblingButtons = (label) => {
        return siblings
            .filter(sibling => sibling[label] && sibling[label] !== product[label] && sibling.size === currentSize)
            .map(sibling => (
                <button
                    className="Product-Menu-sibling-button"
                    onClick={() => navigate(`/${categoryLinks[sibling.category] || sibling.category}/${sibling.id}`)}
                    key={sibling.id}
                >
                    {sibling[label]}
                </button>
            ));
    };

    const sizeButtons = siblings
        .filter(sibling => sibling.size && sibling.size !== currentSize && sibling.color === currentColor)
        .reduce((acc, sibling) => {
            if (!acc.some(btn => btn.key === sibling.size)) {
                acc.push(
                    <button
                        className="Product-Menu-sibling-button"
                        onClick={() => handleSizeChange(sibling.size)}
                        key={sibling.size}
                    >
                        {sibling.size}
                    </button>
                );
            }
            return acc;
        }, []);

    const colorButtons = siblings
        .filter(sibling => sibling.color && sibling.color !== currentColor)
        .reduce((acc, sibling) => {
            if (!acc.some(btn => btn.key === sibling.color)) {
                acc.push(
                    <button
                        className="Product-Menu-sibling-button"
                        onClick={() => handleColorChange(sibling.color)}
                        key={sibling.color}
                    >
                        {sibling.color}
                    </button>
                );
            }
            return acc;
        }, []);

    const useButtons = renderSiblingButtons('use');

    return (
        <div className="Product-Menu-menu">
            {product.oldPrice > 0 && (
                <p className="Product-Menu-old-price">${product.oldPrice.toFixed(2)}</p>
            )}
            <p className="Product-Menu-price">${product.price.toFixed(2)}</p>
            <p className={`Product-Menu-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
            <button
                className={`Product-Menu-add-to-cart-button ${!product.inStock ? 'disabled' : ''}`}
                onClick={() => { if (product.inStock) addToCart(product); }}
            >
                Add to Basket
            </button>

            {colorButtons.length > 0 && (
                <div className="Product-Menu-sibling-buttons">
                    <h3>Other Colors</h3>
                    {colorButtons}
                </div>
            )}

            {sizeButtons.length > 0 && (
                <div className="Product-Menu-sibling-buttons">
                    <h3>Other Sizes</h3>
                    {sizeButtons}
                </div>
            )}

            {useButtons.length > 0 && (
                <div className="Product-Menu-sibling-buttons">
                    <h3>Other Uses</h3>
                    {useButtons}
                </div>
            )}
        </div>
    );
};

export default ProductMenu;
