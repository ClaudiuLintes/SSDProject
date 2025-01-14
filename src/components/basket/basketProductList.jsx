import React, { useState, useEffect } from 'react';
import ProductCardBasket from '../cards/ProductCardBasket';
import { useBasket } from '../../context/BasketContext';

const BasketProductList = ({ initialProducts = [], onQuantityChange }) => {
    const { removeFromCart, updateQuantity } = useBasket();
    const [products, setProducts] = useState(initialProducts);

    const handleUpdateQuantity = (id, newQuantity) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, quantity: newQuantity } : product
            )
        );
        updateQuantity(id, newQuantity);
        onQuantityChange(products); // Notify parent component about the quantity change
    };

    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    return (
        <div className="BasketProductList">
            {products.map((product) => (
                <ProductCardBasket
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    inStock={product.inStock}
                    price={product.price}
                    oldPrice={product.oldPrice}
                    category={product.category}
                    quantity={product.quantity}
                    removeFromCart={() => removeFromCart(product.id)}
                    updateQuantity={handleUpdateQuantity} // Pass handleUpdateQuantity function
                />
            ))}
        </div>
    );
};

export default BasketProductList;
