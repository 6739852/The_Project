import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Component/AppBarr.jsx'
import SignIn from './Component/features/User/SignIn'
import AddGroup from './Component/features/Supplier/AddGroup.jsx'
import SignUp from './Component/features/User/SignUp.jsx'
import Card from './Component/features/User/Cart.jsx'
import Footer from './Component/Footer.jsx'
import HomePage from './Component/HomePage.jsx'
import CategoryTab from './Component/features/Category/CategoryTab.jsx'
import SignUpSupplier from './Component/features/Supplier/SignUpSupplier.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupModel from './Component/features/PurchasingGroup/GroupModel.jsx'
import Routing  from './Component/Routing.jsx'
function App() {

    useEffect(() => {
      document.title = "POWERBUY"
      const favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.href = '../Images/logo_1.jpg'; // Replace with the path to your image
      const existingFavicon = document.querySelector('link[rel="icon"]');
      if (existingFavicon) {
        document.head.removeChild(existingFavicon);
      }
      document.head.appendChild(favicon);
    }, []); 

  return (
    <>
        <NavBar/>
        <CategoryTab/>
        <div style={{ marginTop: '100px' }}>
          <Routing />
        </div>
        {/* <HomePage/> */}
        {/* <SignIn/> */}
        {/* <ExistGroup/> */}
        {/* <AddGroup/> */}
        {/* <SuggestGroup/> */}
        {/* <SignUp/> */}
        {/* <SignUpSupplier/> */}
        <Footer/>
    </>
  )
}

export default App
