import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MainMenu from './components/MainMenu.jsx';
import SecondaryMenu from './components/SecondaryMenu.jsx';

import Home from './components/Home.jsx';
import Basket from './components/Basket.jsx';
import Account from './components/Account.jsx';

import OrderDetails from './components/OrderDetails.jsx';
import OrderPage from './components/OrderPage.jsx';
import SecurityPage from './components/SecurityPage.jsx';
import OrdersPage from './components/OrdersPage.jsx';

import ExternalSSDs from './components/products/ExternalSSDs.jsx';
import InternalSSDs from './components/products/InternalSSDs.jsx';
import SSDAccessories from './components/products/SSDAccessories.jsx';
import SoftwareProducts from './components/products/SoftwareProducts.jsx';
import ProductPage from './components/products/ProductPage.jsx';

import SpecialDeals from './components/SpecialDeals.jsx';
import CustomerSupport from './components/CustomerSupport.jsx';
import Info from './components/Info.jsx';
import Contact from './components/Contact.jsx';

import DatabasePage from './components/DatabasePage.jsx';
import DatabaseProductsPage from './components/database/DatabaseProductsPage.jsx';
import DatabaseOrdersPage from './components/database/DatabaseOrdersPage.jsx';
import DatabaseProductEditor from './components/database/DatabaseProductEditor.jsx';
import DatabaseProductPreview from './components/database/DatabaseProductPreview.jsx';

import LogInPage from './components/auth/LogInPage.jsx';
import RegisterPage from './components/auth/RegisterPage.jsx';

import NotFoundPage from './components/NotFoundPage.jsx';
import AuthRoute from './components/AuthRoute.jsx';
import SearchPage from './components/SearchPage.jsx';

import adminIdList from './components/auth/AdminIdList.jsx';
import { BasketProvider } from './context/BasketContext.jsx';

function App() {
    return (
        <BasketProvider>
            <Router>
                <MainMenu />
                <SecondaryMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/basket" element={<Basket />} />
                    <Route path="/account" element={<Account />} />

                    <Route path="/internal-ssds" element={<InternalSSDs />} />
                    <Route path="/external-ssds" element={<ExternalSSDs />} />
                    <Route path="/ssd-accessories" element={<SSDAccessories />} />
                    <Route path="/ssd-software" element={<SoftwareProducts />} />

                    <Route path="/special-deals" element={<SpecialDeals />} />
                    <Route path="/customer-support" element={<CustomerSupport />} />
                    <Route path="/info" element={<Info />} />
                    <Route path="/contact" element={<Contact />} />

                    <Route path="/internal-ssds/:id" element={<ProductPage />} />
                    <Route path="/external-ssds/:id" element={<ProductPage />} />
                    <Route path="/ssd-accessories/:id" element={<ProductPage />} />
                    <Route path="/ssd-software/:id" element={<ProductPage />} />
                    <Route path="/special-deals/:id" element={<ProductPage />} />

                    <Route path="/order-details" element={<OrderDetails />} />

                    <Route path="/security-options" element={<SecurityPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/order/:orderId" element={<OrderPage />} />

                    <Route path="/database" element={<AuthRoute element={DatabasePage} adminIdList={adminIdList} />} />
                    <Route path="/database-products" element={<AuthRoute element={DatabaseProductsPage} adminIdList={adminIdList} />} />
                    <Route path="/database-orders" element={<AuthRoute element={DatabaseOrdersPage} adminIdList={adminIdList} />} />
                    <Route path="/database-product-editor" element={<AuthRoute element={DatabaseProductEditor} adminIdList={adminIdList} />} />
                    <Route path="/database-product-preview" element={<AuthRoute element={DatabaseProductPreview} adminIdList={adminIdList} />} />

                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/search" element={<SearchPage />} />

                    <Route path="/not-found" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate to="/not-found" />} />
                </Routes>
            </Router>
        </BasketProvider>
    );
}

export default App;
