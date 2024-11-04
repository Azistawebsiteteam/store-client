import { Routes, Route } from "react-router-dom";
// import bootstrap from "bootstrap";
import UserRegistrationPage from "./Pages/Authentication/UserRegistrationPage";
import UserLoginPage from "./Pages/Authentication/UserLoginPage";
import OtpRegistration from "./Pages/Authentication/OtpRegistration";
import OtpLogin from "./Pages/Authentication/OtpLogin";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./Pages/HomePage/Home";
import GoogleSignIn from "./Pages/Authentication/GoogleSignIn";
import EditProfile from "./Pages/UserDashboard/UserProfile/EditProfile";
import Navbar from "./Pages/Components/Navbar";
import ProfileManagement from "./Pages/UserDashboard/UserProfile/ProfileManagement";
import ManageOrders from "./Pages/UserDashboard/OrdersSection/ManageOrders";
import ManageAddress from "./Pages/UserDashboard/UserAddress/ManageAddress";
import PasswordManager from "./Pages/UserDashboard/UserProfile/PasswordManager";
import NewAddress from "./Pages/UserDashboard/UserAddress/NewAddress";
import UpdateDeliveryAddress from "./Pages/UserDashboard/UserAddress/UpdateDeliveryAddress";
import CollectionsDetails from "./Pages/CollectionsPage/CollectionsDetails";
import ProductItem from "./Pages/Components/ProductItem";
import AllProductsPage from "./Pages/Components/AllProductsPage";
import NotFound from "./Pages/Components/NotFound";
import Checkout from "./Pages/Checkout/Checkout";
import WishList from "./Pages/Components/WishList";
import Popup from "./Pages/HomePage/Popup";
import SearchResultsProvider from "./ReactContext/SearchResults";
import Footer from "./Pages/Components/Footer";
import Copyright from "./Pages/Components/Copyright";
import CreatePassword from "./Pages/Authentication/UserRegistrationPage/CreatePassword";
import Blogs from "./Pages/Blogs/Blogs";
import ReturnsAndRefunds from "./Pages/Copyright/ReturnsAndRefunds";
import TermsAndCondition from "./Pages/Copyright/TermsAndCondition";
import SafteyAndSecurity from "./Pages/Copyright/SafteyAndSecurity";
import ShippingPolicy from "./Pages/Copyright/ShippingPolicy";
import FaqsPage from "./Pages/Components/FaqsPage";
import AboutUs from "./Pages/AbouUs/AboutUs";
import BlogsInnerPage from "./Pages/Blogs/BlogsInnerPage";
import ReviewsList from "./Pages/UserDashboard/ReviewsAndRatings/ReviewsList";
import EditReview from "./Pages/UserDashboard/ReviewsAndRatings/EditReview";
import ContactUs from "./Pages/ContactUs/ContactUs";
import RequestCb from "./Pages/RequestCallbackPage/RequestCb";
import OrderDetails from "./Pages/UserDashboard/OrdersSection/OrderDetails";
import OrderSummary from "./Pages/OrderSummary/OrderSummary";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import useNetworkStatus from "./ProtectedRoute/usenetwork";
import NoNetwork from "./Pages/Components/NoNetwork";

function App() {
  const isOnline = useNetworkStatus();
  return (
    <>
      {!isOnline ? (
        <>
          <Routes>
            <Route path="*" element={<NoNetwork />} />
          </Routes>
        </>
      ) : (
        <SearchResultsProvider>
          <Navbar />
          <Routes>
            <Route path="/registration" element={<UserRegistrationPage />} />
            <Route path="/login" element={<UserLoginPage />} />
            <Route path="/otp-registration" element={<OtpRegistration />} />
            <Route path="/otp-login" element={<OtpLogin />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-password" element={<CreatePassword />} />
            <Route path="/googlesignin" element={<GoogleSignIn />} />
            <Route path="/" element={<Home />} />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile-management"
              element={
                <ProtectedRoute>
                  <ProfileManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-orders"
              element={
                <ProtectedRoute>
                  <ManageOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-details/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-address"
              element={
                <ProtectedRoute>
                  <ManageAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password-manager"
              element={
                <ProtectedRoute>
                  <PasswordManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/new-address"
              element={
                <ProtectedRoute>
                  <NewAddress />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update-address/:id"
              element={
                <ProtectedRoute>
                  <UpdateDeliveryAddress />
                </ProtectedRoute>
              }
            />
            <Route path="/collection/:id" element={<CollectionsDetails />} />
            <Route path="/productitem/:id" element={<ProductItem />} />
            <Route path="/search/products" element={<AllProductsPage />} />
            <Route path="/popup" element={<Popup />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogsInner/:id" element={<BlogsInnerPage />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndCondition />}
            />
            <Route
              path="/returns-and-refunds"
              element={<ReturnsAndRefunds />}
            />
            <Route
              path="/safety-and-security"
              element={<SafteyAndSecurity />}
            />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/reviews-ratings" element={<ReviewsList />} />
            <Route path="/edit-review" element={<EditReview />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/request-callback" element={<RequestCb />} />

            <Route path="/order-summary" element={<OrderSummary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Copyright />
        </SearchResultsProvider>
      )}
    </>
  );
}

export default App;
