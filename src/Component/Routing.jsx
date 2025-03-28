import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import ViewPurchasingGroup from './features/PurchasingGroup/ViewPurchasingGroup'
import Cart from './features/User/Cart';
import Fave from './features/User/Fave';
import Profil from './features/User/Profil';
import SignIn from './features/User/SignIn';
import SignUp from './features/User/SignUp';
import SignUpSupplier from './features/Supplier/SignUpSupplier'
import WantToOpen from './features/WantToOpen/WantToOpen'
import AddGroup from './features/Supplier/AddGroup';
import ExistGroups from './features/Supplier/ExistGroups';
import FaveSupplier from './features/Supplier/FaveSupplier';
import GroupModel from './features/PurchasingGroup/GroupModel'


const Routing = () => {
    return (
           <Routes>
                    {/* <Route exact path="/" component={<Home/>} /> */}
                    <Route path="/" element={<HomePage/>}/>
                     <Route path="/SignUp" element={<SignUp/>} />
                    <Route path="/SignIn" element={<SignIn/>} />
                    <Route path="/Profil" element={<Profil/>} />
                    <Route path="/Fave" element={<Fave/>} />
                    <Route path="/FaveSupplier" element={<FaveSupplier/>} />
                    <Route path="/Cart" element={<Cart/>} />
                    <Route path="/ViewPurchasingGroup" element={<ViewPurchasingGroup/>} />
                    <Route path="/HomePage" element={<HomePage/>} />
                    <Route path="/SignUpSupplier" element={<SignUpSupplier/>}/>
                    <Route path="/WantToOpen" element={<WantToOpen/>} />
                    <Route path="/AddGroup" element={<AddGroup/>} />
                    <Route path="/ExistGroups" element={<ExistGroups/>} />
                    <Route path="/GroupModel/:productId" element={<GroupModel />} />
                </Routes>
    );
};

export default Routing;