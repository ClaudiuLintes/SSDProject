import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import ProductCard from '../cards-preview/ProductCard';
import ProductCardHome from '../cards-preview/ProductCardHome';
import ProductCardBasket from '../cards-preview/ProductCardBasket';
import ProductCardOrder from '../cards-preview/ProductCardOrder';
import '../../css/database/DatabaseProductPreview.css';

const DatabaseProductPreview = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
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

    const handleProductChange = (e) => {
        const product = products.find(p => p.id === e.target.value);
        setSelectedProduct(product);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="databaseProductPreview-container">
            <Link to="/database-products" className="databaseProductPreview-button">Database Products</Link>
            <h1>Database Product Preview</h1>
            <div className="form-group">
                <label>Choose Product:</label>
                <select onChange={handleProductChange}>
                    <option value="">Select a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>{product.title}</option>
                    ))}
                </select>
            </div>
            {selectedProduct && (
                <>
                    <div className="product-cards">
                        <h2>Product Card</h2>
                        <ProductCard product={selectedProduct} />
                        <h2>Product Card Home</h2>
                        <ProductCardHome product={selectedProduct} />
                        <h2>Product Card Basket</h2>
                        <ProductCardBasket product={selectedProduct} />
                    </div>
                    <div className="product-order">
                        <h2>Product Card Order</h2>
                        <ProductCardOrder product={selectedProduct} />
                    </div>
                </>
            )}
        </div>
    );
};

export default DatabaseProductPreview;
