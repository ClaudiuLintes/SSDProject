import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Food from './Food.jsx'

import MainMenu from './components/MainMenu.jsx'
import SecondaryMenu from './components/SecondaryMenu.jsx'

import Home from './components/Home.jsx'
import Basket from './components/Basket.jsx'
import Account from './components/Account.jsx'

import ExternalSSDs from './components/products/ExternalSSDs.jsx'
import InternalSSDs from './components/products/InternalSSDs.jsx'
import SSDAccessories from './components/products/SSDAccesories.jsx'
import SoftwareProducts from './components/products/SoftwareProducts.jsx'


import SpecialDeals from './components/SpecialDeals.jsx'
import CustomerSupport from './components/CustomerSupport.jsx'
import Info from './components/Info.jsx'
import Contact from './components/Contact.jsx'

function App() {
  return (
    <Router>
      <MainMenu />
      <SecondaryMenu />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/account" element={<Account />} />

        <Route path="/internal-ssds" element={<InternalSSDs />} />
        <Route path="/external-ssds" element={<ExternalSSDs />} />
        <Route path="/ssd-accesories" element={<SSDAccessories />} />
        <Route path="/ssd-software" element={<SoftwareProducts />} />

        <Route path="/special-deals" element={<SpecialDeals />} />
        <Route path="/customer-support" element={<CustomerSupport />} />
        <Route path="/info" element={<Info />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App
