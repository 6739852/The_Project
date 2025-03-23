import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './Component/AppBarr.jsx'
import ViewPurchasingGroup from './Component/features/PurchasingGroup/ViewpurchasingGroup.jsx'
import SignIn from './Component/features/User/SignIn'
// import AddGroup from './Component/features/Supplier/AddGroup'
import SuggestGroup from './Component/features/User/SuggestGroup'
import SignUp from './Component/features/User/SignUp.jsx'
import ExistGroup  from './Component/features/User/Card.jsx'
import Footer from './Component/Footer.jsx'
import HomePage from './Component/HomePage.jsx'
import CategoryTab from './Component/features/Category/CategoryTab.jsx'
// import SignUpSupplier from './Component/features/Supplier/SignUpSupplier.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
        <NavBar/>
        <CategoryTab/>
        <HomePage/>
        {/* <SignIn/> */}
        {/* <ExistGroup/> */}
        <ViewPurchasingGroup/>
        {/* <AddGroup/> */}
        {/* <SuggestGroup/> */}
        {/* <SignUp/> */}
        {/* <SignUpSupplier/> */}
        <Footer/>
    </>
  )
}

export default App
