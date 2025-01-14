import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/SearchPage.css';
import FilterMenu from './products/FilterMenu';
import ProductCatalog from './products/ProductCatalog';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const calculateMatchPercentage = (title, query) => {
    const titleWords = title.toLowerCase().split(' ');
    const queryWords = query.toLowerCase().split(' ');
    const matches = queryWords.filter(qWord => titleWords.includes(qWord));
    return (matches.length / queryWords.length) * 100;
};

const SearchPage = () => {
    const query = useQuery().get("query") || "";
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAllProducts(productsList);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const filtered = allProducts
            .filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            )
            .map(product => ({
                ...product,
                matchPercentage: calculateMatchPercentage(product.title, query)
            }))
            .sort((a, b) => b.matchPercentage - a.matchPercentage);
        setFilteredProducts(filtered);
    }, [query, allProducts]);

    const handleFilterChange = (filters) => {
        let filtered = allProducts
            .filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            )
            .map(product => ({
                ...product,
                matchPercentage: calculateMatchPercentage(product.title, query)
            }))
            .sort((a, b) => b.matchPercentage - a.matchPercentage);

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
                <ProductCatalog title="Search Results" products={filteredProducts} category="search" />
            </div>
        </div>
    );
};

export default SearchPage;
