import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams, Navigate } from 'react-router-dom';

import MainMenu from './components/MainMenu.jsx';
import SecondaryMenu from './components/SecondaryMenu.jsx';

import Home from './components/Home.jsx';
import Basket from './components/Basket.jsx';
import Account from './components/Account.jsx';

import ExternalSSDs from './components/products/ExternalSSDs.jsx';
import InternalSSDs from './components/products/InternalSSDs.jsx';
import SSDAccessories from './components/products/SSDAccessories.jsx';
import SoftwareProducts from './components/products/SoftwareProducts.jsx';
import ProductPage from './components/products/ProductPage.jsx';

import SpecialDeals from './components/SpecialDeals.jsx';
import CustomerSupport from './components/CustomerSupport.jsx';
import Info from './components/Info.jsx';
import Contact from './components/Contact.jsx';

import ssdInternalProducts from './components/products/sampleProducts/ssdInternalProducts.jsx';
import ssdExternalProducts from './components/products/sampleProducts/ssdExternalProducts.jsx';
import ssdAccessoriesProducts from './components/products/sampleProducts/ssdAccessoriesProducts.jsx';
import softwareProducts from './components/products/sampleProducts/ssdSoftwareProducts.jsx';
import specialProducts from './components/products/sampleProducts/ssdSpecialProducts.jsx';

import NotFoundPage from './components/NotFoundPage.jsx';

const ProductPageWrapper = ({ productList, category }) => {
  const { id } = useParams();
  const product = productList.find(prod => prod.id === id);
  return product ? <ProductPage product={product} category={category} /> : <p>Product not found</p>;
};

function App() {
  return (
    <Router>
      <MainMenu />
      <SecondaryMenu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account" element={<Account />} />

        <Route path="/internal-ssds" element={<InternalSSDs productList={ssdInternalProducts} />} />
        <Route path="/external-ssds" element={<ExternalSSDs productList={ssdExternalProducts} />} />
        <Route path="/ssd-accessories" element={<SSDAccessories productList={ssdAccessoriesProducts} />} />
        <Route path="/ssd-software" element={<SoftwareProducts productList={softwareProducts} />} />

        <Route path="/special-deals" element={<SpecialDeals />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/internal-ssds/:id" element={<ProductPageWrapper productList={ssdInternalProducts} category="internal-ssds" />} />
        <Route path="/external-ssds/:id" element={<ProductPageWrapper productList={ssdExternalProducts} category="external-ssds" />} />
        <Route path="/ssd-accessories/:id" element={<ProductPageWrapper productList={ssdAccessoriesProducts} category="ssd-accessories" />} />
        <Route path="/ssd-software/:id" element={<ProductPageWrapper productList={softwareProducts} category="ssd-software" />} />
        <Route path="/special-deals/:id" element={<ProductPageWrapper productList={specialProducts} category="special-deals" />} />

        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Router>
  );
}

export default App;
