import React from 'react';
import ProductMenu from './productPage/ProductMenu';
import ProductDescription from './productPage/ProductDescription';
import ProductSpecs from './productPage/ProductSpecs';
import ssdInternalProducts from '../products/sampleProducts/ssdInternalProducts';
import ssdExternalProducts from '../products/sampleProducts/ssdExternalProducts';
import ssdAccessoriesProducts from '../products/sampleProducts/ssdAccessoriesProducts';
import ssdSoftwareProducts from '../products/sampleProducts/ssdSoftwareProducts';
import ssdSpecialProducts from '../products/sampleProducts/ssdSpecialProducts';
import '../../css/products/ProductPage.css';

const sampleProductsByCategory = {
    'internal-ssds': ssdInternalProducts,
    'external-ssds': ssdExternalProducts,
    'ssd-accessories': ssdAccessoriesProducts,
    'ssd-software': ssdSoftwareProducts,
    'special-deals': ssdSpecialProducts,
};

const ProductPage = ({ product, category }) => {
    // Find sibling products based on GroupId and category, excluding those with groupId -1
    const siblings = sampleProductsByCategory[category].filter(p => p.groupId !== -1 && p.groupId === product.groupId && p.id !== product.id);

    return (
        <div className="ProductPage-page">
            <div className="ProductPage-card">
                <h1 className="ProductPage-title">{product.title}</h1>
                <div className="ProductPage-content">
                    <div className="ProductPage-photo">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <ProductMenu product={product} siblings={siblings} category={category} />
                </div>
                <ProductDescription description={product.description || 'No description available'} />
                <ProductSpecs specs={product.specs || ['No specifications available']} />
            </div>
        </div>
    );
};

export default ProductPage;
