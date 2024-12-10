import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/SearchPage.css';
import FilterMenu from './products/FilterMenu';
import ProductCatalog from './products/ProductCatalog';
import sampleProducts from './products/sampleProducts/ssdSpecialProducts';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
    const query = useQuery().get("query") || "";
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = sampleProducts.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [query]);

    const handleFilterChange = (filters) => {
        let filtered = sampleProducts.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

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
                <ProductCatalog title="Search Results" products={filteredProducts} category="search" />
            </div>
        </div>
    );
};

export default SearchPage;
