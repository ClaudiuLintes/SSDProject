import React, { useState, useEffect } from 'react';
import '../../css/products/ProductCatalog.css';
import ProductCard from '../cards/ProductCard';
import { useBasket } from '../../context/BasketContext';

const ProductCatalog = ({ title, products, category }) => {
    const [sortedProducts, setSortedProducts] = useState(products);
    const [sortOption, setSortOption] = useState('name-asc');
    const { addToCart } = useBasket(); // Get addToCart function from BasketContext

    useEffect(() => {
        sortProducts(sortOption);
    }, [sortOption, products]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortProducts = (option) => {
        let sorted = [...products];

        // Separate in-stock and out-of-stock products
        const inStockProducts = sorted.filter(product => product.inStock);
        const outOfStockProducts = sorted.filter(product => !product.inStock);

        if (option === 'price-asc') {
            inStockProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'price-desc') {
            inStockProducts.sort((a, b) => b.price - a.price);
        } else if (option === 'name-asc') {
            inStockProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (option === 'name-desc') {
            inStockProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        // Combine sorted in-stock products with out-of-stock products at the end
        sorted = [...inStockProducts, ...outOfStockProducts];
        setSortedProducts(sorted);
    };

    return (
        <div className="product-catalog">
            <h1>{title}</h1>
            <div className="filter">
                <select id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="price-asc">Price (Low to High)</option>
                    <option value="price-desc">Price (High to Low)</option>
                </select>
            </div>
            <div className="product-grid">
                {sortedProducts.map((product, index) => (
                    <ProductCard
                        key={index}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        inStock={product.inStock}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        category={product.category}
                        addToCart={() => addToCart(product)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;
