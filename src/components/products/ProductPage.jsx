import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase'; // Ensure the path is correct
import ProductMenu from './productPage/ProductMenu';
import ProductDescription from './productPage/ProductDescription';
import ProductSpecs from './productPage/ProductSpecs';
import '../../css/products/ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [siblings, setSiblings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setError('Product ID is missing');
                setLoading(false);
                return;
            }

            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const productData = docSnap.data();
                    setProduct(productData);

                    // Query for sibling products based on the same product.model
                    const siblingsQuery = query(collection(db, 'products'), where('model', '==', productData.model), where('__name__', '!=', id));
                    const siblingsSnapshot = await getDocs(siblingsQuery);
                    const siblingsList = siblingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setSiblings(siblingsList);
                } else {
                    setError(`Product not found: ${id}`);
                }
            } catch (error) {
                setError(`Failed to fetch product: ${id}`);
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>No product data available.</p>;
    }

    return (
        <div className="ProductPage-page">
            <div className="ProductPage-card">
                <h1 className="ProductPage-title">{product.title}</h1>
                <div className="ProductPage-content">
                    <div className="ProductPage-photo">
                        <img src={product.image} alt={product.title} />
                    </div>
                    <ProductMenu product={product} siblings={siblings} />
                </div>
                <ProductDescription description={product.description || 'No description available'} />
                <ProductSpecs specs={product.specs || ['No specifications available']} />
            </div>
        </div>
    );
};

export default ProductPage;
