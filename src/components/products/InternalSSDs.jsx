import React, { useState } from 'react';
import '../../css/products/InternalSSDs.css';
import FilterMenu from './FilterMenu';
import ProductCatalog from './ProductCatalog';
import sampleProducts from './sampleProducts/ssdInternalProducts.jsx'

const InternalSSDs = () => {
    const [filteredProducts, setFilteredProducts] = useState(sampleProducts);

    const handleFilterChange = (filters) => {
        let filtered = sampleProducts;

        if (filters.inStock) {
            filtered = filtered.filter(product => product.inStock);
        }
        if (filters.priceFrom) {
            filtered = filtered.filter(product => product.price >= parseFloat(filters.priceFrom));
        }
        if (filters.priceTo) {
            filtered = filtered.filter(product => product.price <= parseFloat(filters.priceTo));
        }
        if (filters.selectedBrands.length > 0) {
            filtered = filtered.filter(product => filters.selectedBrands.includes(product.brand));
        }
        if (filters.selectedTypes.length > 0) {
            filtered = filtered.filter(product => filters.selectedTypes.includes(product.type));
        }
        if (filters.selectedSizes.length > 0) {
            filtered = filtered.filter(product => filters.selectedSizes.includes(product.size));
        }
        if (filters.selectedColors.length > 0) {
            filtered = filtered.filter(product => filters.selectedColors.includes(product.color));
        }
        if (filters.selectedUses.length > 0) {
            filtered = filtered.filter(product => filters.selectedUses.includes(product.use));
        }

        setFilteredProducts(filtered);
    };

    return (
        <div className="product-page">
            <FilterMenu
                products={sampleProducts}
                onFilterChange={handleFilterChange}
            />
            <div className="product-list">
                <ProductCatalog title="Internal SSDs" products={filteredProducts} category="internal-ssds" />
            </div>
        </div>
    );
};

export default InternalSSDs;
