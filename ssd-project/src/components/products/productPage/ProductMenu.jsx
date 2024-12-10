import React from 'react';
import { Link } from 'react-router-dom';
import '../../../css/products/productPage/ProductMenu.css';

const ProductMenu = ({ product, siblings, category }) => {
    // Helper function to generate buttons for sibling products
    const renderSiblingButtons = (label) => {
        return siblings
            .filter(sibling => sibling[label] && sibling[label] !== product[label])
            .map(sibling => (
                <Link to={`/${category}/${sibling.id}`} key={sibling.id}>
                    <button className="Product-Menu-sibling-button">
                        {sibling[label]}
                    </button>
                </Link>
            ));
    };

    const sizeButtons = renderSiblingButtons('size');
    const colorButtons = renderSiblingButtons('color');
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
            <button className="Product-Menu-add-to-cart-button">
                Add to Basket
            </button>

            {sizeButtons.length > 0 && (
                <div className="Product-Menu-sibling-buttons">
                    <h3>Other Sizes</h3>
                    {sizeButtons}
                </div>
            )}

            {colorButtons.length > 0 && (
                <div className="Product-Menu-sibling-buttons">
                    <h3>Other Colors</h3>
                    {colorButtons}
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
