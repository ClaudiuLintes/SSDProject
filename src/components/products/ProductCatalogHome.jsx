import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import ProductCardHome from "../cards/ProductCardHome";
import "../../css/products/ProductCatalogHome.css";
import { useBasket } from '../../context/BasketContext';

function ProductCatalogHome() {
    const [topSalesProducts, setTopSalesProducts] = useState([]);
    const { addToCart } = useBasket(); // Get addToCart function from BasketContext

    useEffect(() => {
        const fetchProducts = async () => {
            const q = query(collection(db, 'products'), where('oldPrice', '>', 0));
            const querySnapshot = await getDocs(q);
            const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedProducts = productsList
                .filter(product => product.inStock)
                .map(product => ({
                    ...product,
                    discount: product.oldPrice - product.price
                }))
                .sort((a, b) => b.discount - a.discount)
                .slice(0, 5);
            setTopSalesProducts(sortedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div className="ProductCatalogHome-product-catalog">
            <h1 className="ProductCatalogHome-heading">Best Deals</h1>
            <div className="ProductCatalogHome-product-grid">
                {topSalesProducts.map((product) => (
                    <ProductCardHome
                        key={product.id}
                        id={product.id}
                        image={product.image}
                        title={product.title}
                        inStock={product.inStock}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        category={product.category} // Use product's category
                        addToCart={() => addToCart(product)} // Call addToCart with product data
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductCatalogHome;
