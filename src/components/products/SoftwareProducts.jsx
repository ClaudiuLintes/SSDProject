import React, { useState, useEffect } from 'react';
import '../../css/products/SoftwareProducts.css';
import FilterMenu from './FilterMenu';
import ProductCatalog from './ProductCatalog';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';

const SoftwareProducts = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, 'products'), where('category', '==', 'Software'));
            const querySnapshot = await getDocs(q);
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllProducts(productsList);
            setFilteredProducts(productsList);
        };

        fetchProducts();
    }, []);

    const handleFilterChange = (filters) => {
        let filtered = allProducts;

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
                products={allProducts}
                onFilterChange={handleFilterChange}
            />
            <div className="product-list">
                <ProductCatalog title="Software Products" products={filteredProducts} category="ssd-software" />
            </div>
        </div>
    );
};

export default SoftwareProducts;
