import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure the path is correct
import BasketProductList from './basket/BasketProductList';
import BasketSummaryMenu from './basket/BasketSummaryMenu';
import '../css/Basket.css';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Import onAuthStateChanged

const Basket = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBasketProducts = async (user) => {
            try {
                const userDocRef = doc(db, 'basket', user.uid);
                const basketCollectionRef = collection(userDocRef, 'basket');
                const basketQuery = query(basketCollectionRef);
                const querySnapshot = await getDocs(basketQuery);
                const basketProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(basketProducts);
            } catch (error) {
                console.error('Error fetching basket products: ', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchBasketProducts(user);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleQuantityChange = (updatedProducts) => {
        setProducts(updatedProducts); // Update products state
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (products.length === 0) {
        return (
            <div className="Basket-empty">
                <h1>Your basket is empty</h1>
                <Link to="/" className="Basket-home-link">
                    <button>Go to Home</button>
                </Link>
            </div>
        );
    }

    const inStockProducts = products.filter(product => product.inStock);

    return (
        <div className="Basket-container">
            <div className="Basket-product-list">
                <h1>Shopping Basket</h1>
                <BasketProductList initialProducts={inStockProducts} onQuantityChange={handleQuantityChange} />
            </div>
            <div className="Basket-summary">
                <BasketSummaryMenu products={inStockProducts} onQuantityChange={handleQuantityChange} />
            </div>
        </div>
    );
};

export default Basket;
