import React from 'react';
import '../../../css/products/productPage/ProductSpecs.css';

const ProductSpecs = ({ specs }) => {
    return (
        <div className="product-specs">
            <h2>Specifications</h2>
            <ul>
                {specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductSpecs;
