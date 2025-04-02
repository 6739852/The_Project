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
import Join from './features/PurchasingGroup/Join'
import About from './About'
import Contact from './Contact'
import SupplierList from './features/Supplier/SupplierList'
import SupplierModel from './features/Supplier/SupplierModel';
import SalesReports from './features/Reports/SalesReports';
import Deals from './Deals'
import FaveModel from './features/Supplier/FaveModel'
import GetAndOpenGroup from './features/PurchasingGroup/GetAndOpenGroup'
import Gemini from './features/PurchasingGroup/Gemini'

const Routing = () => {
    return (
        <Routes>
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
               <Route path="/GroupModel" element={<GroupModel />} />
               <Route path="/Join" element={<Join />} />
               <Route path="/About" element={<About />} />
               <Route path="/Contact" element={<Contact />} />
               <Route path="/SupplierList" element={<SupplierList />} />
               <Route path="/SupplierModel" element={<SupplierModel />} />
               <Route path="/SalesReports" element={<SalesReports/>}/>
               <Route path="/Deals" element={<Deals/>}/>
               <Route path="/FaveModel" element={<FaveModel/>}/>
               <Route path="/GetAndOpenGroup" element={<GetAndOpenGroup/>}/>
               <Route path="/Gemini" element={<Gemini/>}/>
          </Routes>
    )
};
export default Routing;