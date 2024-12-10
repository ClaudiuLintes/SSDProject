import React from "react";
import sampleProducts from './sampleProducts/ssdSpecialProducts';
import ProductCardHome from "../cards/ProductCardHome";
import "../../css/products/ProductCatalogHome.css";

function ProductCatalogHome({ category }) {
    const topSalesProducts = sampleProducts
        .filter(product => product.inStock)
        .map(product => ({
            ...product,
            discount: product.oldPrice - product.price
        }))
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 5);

    const addToCart = (id) => {
        console.log(`Product ${id} added to cart`);
    };

    return (
        <div className="ProductCatalogHome-product-catalog">
            <h1 className="ProductCatalogHome-heading">Best Deals</h1>
            <div className="ProductCatalogHome-product-grid">
                {topSalesProducts.map((product) => (
                    <ProductCardHome
                        key={product.id}
                        id={product.id}
                        image={product.imageUrl}
                        title={product.title}
                        inStock={product.inStock}
                        price={product.price}
                        oldPrice={product.oldPrice}
                        category={category}
                        addToCart={() => addToCart(product.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductCatalogHome;
