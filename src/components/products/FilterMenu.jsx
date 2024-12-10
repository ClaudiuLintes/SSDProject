import React, { useState, useEffect } from 'react';
import '../../css/products/FilterMenu.css';

const FilterMenu = ({ products, brands, types, sizes, colors, uses, onFilterChange }) => {
    const [filters, setFilters] = useState({
        inStock: false,
        priceFrom: '',
        priceTo: '',
        selectedBrands: [],
        selectedTypes: [],
        selectedSizes: [],
        selectedColors: [],
        selectedUses: []
    });

    const [counts, setCounts] = useState({
        brands: {},
        types: {},
        sizes: {},
        colors: {},
        uses: {},
        inStock: 0
    });

    useEffect(() => {
        calculateCounts();
    }, [products]);

    const calculateCounts = () => {
        const brandCounts = {};
        const typeCounts = {};
        const sizeCounts = {};
        const colorCounts = {};
        const useCounts = {};
        let inStockCount = 0;

        products.forEach(product => {
            if (product.inStock) {
                inStockCount++;
            }

            if (product.brand && product.brand !== 'None') {
                if (brandCounts[product.brand]) {
                    brandCounts[product.brand]++;
                } else {
                    brandCounts[product.brand] = 1;
                }
            }

            if (product.type && product.type !== 'None') {
                if (typeCounts[product.type]) {
                    typeCounts[product.type]++;
                } else {
                    typeCounts[product.type] = 1;
                }
            }

            if (product.size && product.size !== 'None') {
                if (sizeCounts[product.size]) {
                    sizeCounts[product.size]++;
                } else {
                    sizeCounts[product.size] = 1;
                }
            }

            if (product.color && product.color !== 'None') {
                if (colorCounts[product.color]) {
                    colorCounts[product.color]++;
                } else {
                    colorCounts[product.color] = 1;
                }
            }

            if (product.use && product.use !== 'None') {
                if (useCounts[product.use]) {
                    useCounts[product.use]++;
                } else {
                    useCounts[product.use] = 1;
                }
            }
        });

        setCounts({
            brands: brandCounts,
            types: typeCounts,
            sizes: sizeCounts,
            colors: colorCounts,
            uses: useCounts,
            inStock: inStockCount
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && name !== 'inStock') {
            const newArray = checked
                ? [...filters[name], value]
                : filters[name].filter((item) => item !== value);
            setFilters({
                ...filters,
                [name]: newArray
            });
        } else if (name === 'inStock') {
            setFilters({
                ...filters,
                inStock: checked
            });
        } else {
            setFilters({
                ...filters,
                [name]: value
            });
        }
    };

    const handleFilterChange = () => {
        onFilterChange(filters);
    };

    const sortedBrands = Object.keys(counts.brands).sort((a, b) => counts.brands[b] - counts.brands[a]);
    const sortedTypes = Object.keys(counts.types).sort((a, b) => counts.types[b] - counts.types[a]);
    const sortedSizes = Object.keys(counts.sizes).sort((a, b) => counts.sizes[b] - counts.sizes[a]);
    const sortedColors = Object.keys(counts.colors).sort((a, b) => counts.colors[b] - counts.colors[a]);
    const sortedUses = Object.keys(counts.uses).sort((a, b) => counts.uses[b] - counts.uses[a]);

    return (
        <div className="filter-menu">
            <h2>Filter Products</h2>
            <div className="filter-section">
                <label>
                    Availability
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="inStock"
                        checked={filters.inStock}
                        onChange={handleChange}
                    />
                    In Stock <span className="count">({counts.inStock})</span>
                </label>
            </div>
            <div className="filter-section">
                <label>Price</label>
                <input
                    type="number"
                    name="priceFrom"
                    placeholder="From $"
                    value={filters.priceFrom}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="priceTo"
                    placeholder="To $"
                    value={filters.priceTo}
                    onChange={handleChange}
                />
            </div>
            {sortedBrands.length > 0 && (
                <div className="filter-section">
                    <label>Brands</label>
                    {sortedBrands.map((brand, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="selectedBrands"
                                value={brand}
                                checked={filters.selectedBrands.includes(brand)}
                                onChange={handleChange}
                            />
                            {brand} <span className="count">({counts.brands[brand] || 0})</span>
                        </label>
                    ))}
                </div>
            )}
            {sortedTypes.length > 0 && (
                <div className="filter-section">
                    <label>Product Type</label>
                    {sortedTypes.map((type, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="selectedTypes"
                                value={type}
                                checked={filters.selectedTypes.includes(type)}
                                onChange={handleChange}
                            />
                            {type} <span className="count">({counts.types[type] || 0})</span>
                        </label>
                    ))}
                </div>
            )}
            {sortedSizes.length > 0 && (
                <div className="filter-section">
                    <label>Size</label>
                    {sortedSizes.map((size, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="selectedSizes"
                                value={size}
                                checked={filters.selectedSizes.includes(size)}
                                onChange={handleChange}
                            />
                            {size} <span className="count">({counts.sizes[size] || 0})</span>
                        </label>
                    ))}
                </div>
            )}
            {sortedColors.length > 0 && (
                <div className="filter-section">
                    <label>Color</label>
                    {sortedColors.map((color, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="selectedColors"
                                value={color}
                                checked={filters.selectedColors.includes(color)}
                                onChange={handleChange}
                            />
                            {color} <span className="count">({counts.colors[color] || 0})</span>
                        </label>
                    ))}
                </div>
            )}
            {sortedUses.length > 0 && (
                <div className="filter-section">
                    <label>Uses</label>
                    {sortedUses.map((use, index) => (
                        <label key={index}>
                            <input
                                type="checkbox"
                                name="selectedUses"
                                value={use}
                                checked={filters.selectedUses.includes(use)}
                                onChange={handleChange}
                            />
                            {use} <span className="count">({counts.uses[use] || 0})</span>
                        </label>
                    ))}
                </div>
            )}
            <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
    );
};

export default FilterMenu;
