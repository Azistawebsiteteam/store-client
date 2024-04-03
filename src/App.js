import { Routes, Route } from 'react-router-dom'


import UserRegistrationPage from './Pages/Authentication/UserRegistrationPage';
import UserLoginPage from './Pages/Authentication/UserLoginPage';
import OtpRegistration from './Pages/Authentication/OtpRegistration';
import OtpLogin from './Pages/Authentication/OtpLogin';
import ForgotPassword from './Pages/Authentication/ForgotPassword';
import ProtectedRoute from './ProtectedRoute'
import Home from './Pages/Components/Home'
import GoogleSignIn from './Pages/Authentication/GoogleSignIn'
import EditProfile from './Pages/UserDashboard/UserProfile/EditProfile';
import Navbar from './Pages/Components/Navbar'
import ProfileManagement from './Pages/UserDashboard/UserProfile/ProfileManagement';
import ManageOrders from './Pages/UserDashboard/ManageOrders';
import ManageAddress from './Pages/UserDashboard/UserAddress/ManageAddress';
import PasswordManager from './Pages/UserDashboard/UserProfile/PasswordManager';
import NewAddress from './Pages/UserDashboard/UserAddress/NewAddress';
import UpdateDeliveryAddress from './Pages/UserDashboard/UserAddress/UpdateDeliveryAddress';
import CollectionsDetails from './Pages/Components/CollectionsDetails';
import ProductItem from './Pages/Components/ProductItem'
import AllProductsPage from './Pages/Components/AllProductsPage';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Cart from './Pages/Components/Cart';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<UserRegistrationPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/otp-registration" element={<OtpRegistration />} />
        <Route path="/otp-login" element={<OtpLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/googlesignin' element={<GoogleSignIn />} />
        <Route path='/edit-profile' element={<ProtectedRoute ><EditProfile /></ProtectedRoute>} />
        <Route path="/profile-management" element={<ProtectedRoute ><ProfileManagement /></ProtectedRoute>} />
        <Route path="/manage-orders" element={<ProtectedRoute ><ManageOrders /></ProtectedRoute>} />
        <Route path="/manage-address" element={<ProtectedRoute ><ManageAddress /></ProtectedRoute>} />
        <Route path="/password-manager" element={<ProtectedRoute ><PasswordManager /></ProtectedRoute>} />
        <Route path="/new-address" element={<ProtectedRoute ><NewAddress /></ProtectedRoute>} />
        <Route path='/update-address/:id' element={<ProtectedRoute ><UpdateDeliveryAddress /></ProtectedRoute>} />
        <Route path='/collections/:id' element={<CollectionsDetails />} />
        <Route path='/productitem/:id' element={<ProductItem />} />
        <Route path='/search/products' element={<AllProductsPage />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
