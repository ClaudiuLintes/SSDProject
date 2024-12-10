import React from "react";
import CustomCarousel from "./cards/CustomCarousel.jsx";
import ProductCatalogHome from "./products/ProductCatalogHome.jsx";
import prom1 from "../assets/promotions/prom1.png";
import prom2 from "../assets/promotions/prom2.png";
import prom3 from "../assets/promotions/prom3.png";
import prom4 from "../assets/promotions/prom4.png";
import prom5 from "../assets/promotions/prom5.png";
import "../css/Home.css";

const images = [
    { imgURL: prom1, imgAlt: "Promotion 1" },
    { imgURL: prom2, imgAlt: "Promotion 2" },
    { imgURL: prom3, imgAlt: "Promotion 3" },
    { imgURL: prom4, imgAlt: "Promotion 4" },
    { imgURL: prom5, imgAlt: "Promotion 5" },
];

function Home() {
    return (
        <div className="Home">
            <div className="Home-card">
                <CustomCarousel>
                    {images.map((image, index) => (
                        <img key={index} src={image.imgURL} alt={image.imgAlt} />
                    ))}
                </CustomCarousel>
            </div>
            <div className="Home-card">
                <ProductCatalogHome category="special-deals" />
            </div>
        </div>
    );
}

export default Home;
