import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import '../../css/database/DatabaseProductsPage.css';

const DatabaseProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
            } catch (error) {
                console.error('Error fetching products: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const sortProducts = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }

        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setProducts(sortedProducts);
        setSortConfig({ key, direction });
    };

    const getArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
        }
        return '';
    };

    const updatePrice = async (product, priceType) => {
        const newPrice = parseFloat(prompt(`Enter the new ${priceType}:`, product[priceType]));
        if (!isNaN(newPrice) && newPrice >= 0) {
            try {
                await updateDoc(doc(db, 'products', product.id), { [priceType]: newPrice });
                const updatedProducts = products.map((p) =>
                    p.id === product.id ? { ...p, [priceType]: newPrice } : p
                );
                setProducts(updatedProducts);
            } catch (error) {
                console.error(`Error updating product ${priceType}: `, error);
            }
        } else {
            alert("Invalid price entered.");
        }
    };

    const toggleInStock = async (product) => {
        const newInStock = !product.inStock;
        try {
            await updateDoc(doc(db, 'products', product.id), { inStock: newInStock });
            const updatedProducts = products.map((p) =>
                p.id === product.id ? { ...p, inStock: newInStock } : p
            );
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error updating product stock status: ', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="databaseProductsPage-container">
            <div className="databaseOrderPage-buttons">
                <Link to="/database-product-preview" className="databaseProductEditor-button">Database Product Preview</Link>
                <Link to="/database-product-editor" className="databaseOrderPage-button">Product Editor</Link>
                <Link to="/database" className="databaseOrderPage-button">Database Control Panel</Link>
            </div>
            <h1>Database Product List</h1>
            <table className="databaseProductsPage-table">
                <thead>
                    <tr>
                        <th onClick={() => sortProducts('crt')}>Number{getArrow('crt')}</th>
                        <th onClick={() => sortProducts('id')}>Id{getArrow('id')}</th>
                        <th onClick={() => sortProducts('category')}>Category{getArrow('category')}</th>
                        <th>Image</th>
                        <th onClick={() => sortProducts('title')}>Title{getArrow('title')}</th>
                        <th onClick={() => sortProducts('inStock')}>In Stock{getArrow('inStock')}</th>
                        <th onClick={() => sortProducts('price')}>Price{getArrow('price')}</th>
                        <th onClick={() => sortProducts('brand')}>Brand{getArrow('brand')}</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.id}</td>
                            <td>{product.category}</td>
                            <td><img src={product.image} alt={product.title} className="product-image" /></td>
                            <td>{product.title}</td>
                            <td className={`product-stock ${product.inStock ? 'in-stock' : 'out-of-stock'}`}
                                onClick={() => toggleInStock(product)}>
                                {product.inStock ? 'Yes' : 'No'}
                            </td>
                            <td className="databaseProductsPage-price">
                                {product.oldPrice > 0 && (
                                    <div onClick={() => updatePrice(product, 'oldPrice')} className="databaseProductsPage-old-price">${product.oldPrice.toFixed(2)}</div>
                                )}
                                <div onClick={() => updatePrice(product, 'price')} className="databaseProductsPage-current-price">${product.price.toFixed(2)}</div>
                            </td>
                            <td>{product.brand}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DatabaseProductsPage;
