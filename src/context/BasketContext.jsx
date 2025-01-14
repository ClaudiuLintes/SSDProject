import React, { createContext, useContext, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, doc, updateDoc, getDoc, deleteDoc, setDoc } from 'firebase/firestore';

const BasketContext = createContext();

export const useBasket = () => {
    return useContext(BasketContext);
};

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const addToCart = async (product) => {
        const user = auth.currentUser;
        if (!user) {
            alert("You need to log in to add items to your cart.");
            return;
        }

        try {
            const userDocRef = doc(db, 'basket', user.uid);
            const basketCollectionRef = collection(userDocRef, 'basket');
            const productDocRef = doc(basketCollectionRef, product.id);
            const productDoc = await getDoc(productDocRef);

            if (productDoc.exists()) {
                const existingProduct = productDoc.data();
                await updateDoc(productDocRef, {
                    quantity: existingProduct.quantity + 1
                });
                setBasket(prevBasket =>
                    prevBasket.map(p =>
                        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                    )
                );
            } else {
                await setDoc(productDocRef, {
                    ...product,
                    quantity: 1
                });
                setBasket(prevBasket => [...prevBasket, { ...product, quantity: 1 }]);
            }

            alert(`Product added to cart!`);
        } catch (error) {
            console.error('Error adding product to cart: ', error);
            alert("Failed to add product to cart.");
        }
    };

    const removeFromCart = async (productId) => {
        const user = auth.currentUser;

        if (!user) {
            alert("You need to log in to remove items from your cart.");
            return;
        }

        try {
            const userDocRef = doc(db, 'basket', user.uid);
            const basketCollectionRef = collection(userDocRef, 'basket');
            const productDocRef = doc(basketCollectionRef, productId);
            await deleteDoc(productDocRef);

            setBasket(prevBasket =>
                prevBasket.filter(p => p.id !== productId)
            );

            window.location.reload();
        } catch (error) {
            console.error('Error removing product from cart: ', error);
            alert("Failed to remove product from cart.");
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        const user = auth.currentUser;
        if (!user) {
            alert("You need to log in to update item quantities.");
            return;
        }

        try {
            const userDocRef = doc(db, 'basket', user.uid);
            const basketCollectionRef = collection(userDocRef, 'basket');
            const productDocRef = doc(basketCollectionRef, productId);
            const productDoc = await getDoc(productDocRef);

            if (productDoc.exists()) {
                await updateDoc(productDocRef, { quantity: newQuantity });
                setBasket(prevBasket =>
                    prevBasket.map(p =>
                        p.id === productId ? { ...p, quantity: newQuantity } : p
                    )
                );
                window.location.reload();

            }
        } catch (error) {
            console.error('Error updating product quantity: ', error);
            alert("Failed to update product quantity.");
        }
    };

    return (
        <BasketContext.Provider value={{ basket, addToCart, removeFromCart, updateQuantity, refreshKey }}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketProvider;
