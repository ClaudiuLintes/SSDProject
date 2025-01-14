import React, { useState, useEffect } from 'react';
import OrderForm from './basket/OrderForm';
import OrderSummary from './basket/OrderSummary';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase'; // Ensure the path is correct
import '../css/OrderDetails.css';
import { onAuthStateChanged } from 'firebase/auth';

const OrderDetails = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cost, setCost] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [discount, setDiscount] = useState(0);

    useEffect(() => {
        const fetchBasketProducts = async (user) => {
            try {
                const userDocRef = doc(db, 'basket', user.uid);
                const basketCollectionRef = collection(userDocRef, 'basket');
                const basketQuery = query(basketCollectionRef);
                const querySnapshot = await getDocs(basketQuery);
                const basketProducts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(basketProducts);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCost(userDoc.data().cost || 0);
                    setShippingCost(userDoc.data().shippingcost || 0);
                    setDiscount(userDoc.data().discount || 0);
                }
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (products.length === 0) {
        return <p>Your basket is empty</p>;
    }

    return (
        <div className="OrderDetails-container">
            <div className="OrderDetails-form">
                <OrderForm basketProducts={products} shippingCost={shippingCost} orderCost={cost} discount={discount} />
            </div>
            <div className="OrderDetails-summary">
                <OrderSummary products={products} />
            </div>
        </div>
    );
};

export default OrderDetails;
