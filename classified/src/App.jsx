import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState,useEffect} from 'react'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { useLocation } from 'react-router-dom';


import Home from "./sections/Introduction-pages/home/Home";
import LoginPage from "./component/Login/Login";
import PrivateRoute from "./sections/PrivateRoute/PrivateRoute";
import PageNotFound from "./sections/PageNotFound/PageNotFound";
import SignUp from "./component/SignuUp/SignUp";
import Business from "./sections/Introduction-pages/business/Business";

import ForgetPassword from "./component/ForgetPassword/ForgetPassword";
import ResetPassword from './component/resetPassword/ResetPassword'
import LogintoBusiness from "./sections/AddyourBusiness/logintobusiness/LogintoBusiness";
import Businesscart from "./sections/AddyourBusiness/Businesscart";
import AddYourBusiness from "./sections/AddyourBusiness/AddYourBusiness";
import UserInfo from "./sections/Sidebar/edit profile/userInfo/UserInfo";
import Subcategory from "./sections/Introduction-pages/home/category/Subcategory";
import BusinessListing from "./sections/Introduction-pages/home/category/BusinessListing";

import SingleBusinessListing from './sections/Introduction-pages/home/category/SingleBusinessListing'
import WriteAReview from "./sections/review/WriteAReview";
import ViewYourProfile from "./sections/Sidebar/viewyourprofile/ViewYourProfile";
import MyFavourites from "./sections/Sidebar/favourites/Favourites";
import EditBusiness from "./sections/Introduction-pages/business/EditBusiness";
import Contact from "./sections/Introduction-pages/business/Contact";
import Website from "./sections/Introduction-pages/business/Website";
import Photo from "./sections/Introduction-pages/business/Photo";
import BusinessName from "./sections/Introduction-pages/business/BusinessName";
import BusinessAddress from "./sections/Introduction-pages/business/BusinessAddress";
import BusinessTiming from "./sections/Introduction-pages/business/Businesstiming";
import AdditionalInfo from "./sections/Introduction-pages/business/AdditionalInfo";
function App() {
  const [toggled, setToggled] = useState(false);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behaviour:"smooth"
      });
    }, [pathname]);
  
    return null;
  };
  return (
    <>
      <BrowserRouter>
    <ScrollToTop/>
        <Routes>
         
            {/* <Route path='/' element={<Home/>}/>       */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpass" element={<ForgetPassword />} />
          <Route path="/resetpass" element={<ResetPassword />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path='/subcategory/:categoryName?' element={<Subcategory/>}/>
            <Route path='/businesslist/:subCategoryName?' element={<BusinessListing />} />
            <Route path = '/businesslist' element={<BusinessListing/>}/>        
            <Route path='/singleBusiness/:id' element ={<SingleBusinessListing/>} />
            <Route path='/singleBusiness' element ={<SingleBusinessListing/>} />
            <Route path ='/toreview' element={<WriteAReview/>}/>
            <Route path="/logintobusiness" element={<LogintoBusiness />} />
            <Route path='/businesscart' element={<Businesscart />} />
            <Route path='/addbusiness' element={<AddYourBusiness />} />
            <Route path='/editprofile' element={<UserInfo />} />
            <Route path='/viewyourprofile' element={<ViewYourProfile />} />
            <Route path='/fav' element={<MyFavourites />} />

            {/* //edit business */}


            <Route path="/business" element={<Business />} />
            <Route path="/editbusiness/:id" element={<EditBusiness toggled={toggled}  setToggled={setToggled}/>} />
            <Route path='/editbusiness/:id/contact' element={<Contact />} />
            <Route path='/editbusiness/:id/website' element={<Website />} />
            <Route path='/editbusiness/:id/photo' element={<Photo />} />
            <Route path='/editbusiness/:id/businessname' element={<BusinessName />} />
            <Route path='/editbusiness/:id/businessaddress' element={<BusinessAddress />} />
            <Route path='/editbusiness/:id/businesstiming' element={<BusinessTiming />} />
            <Route path='/editbusiness/:id/additiondata' element={<AdditionalInfo />} />

            
          
            
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
