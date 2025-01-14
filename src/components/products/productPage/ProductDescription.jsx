import React from 'react';
import '../../../css/products/productPage/ProductDescription.css';

const ProductDescription = ({ description }) => {
    return (
        <div className="product-description">
            <h2>Description</h2>
            <p>{description}</p>
        </div>
    );
};

export default ProductDescription;
