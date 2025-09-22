import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";
import { useAppContext } from "../context/AppContext";
import Login from "../components/Login";
import Products from "../pages/Products";
import CategoryProducts from "../pages/CategoryProducts";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import AddAddress from "../pages/AddAddress";
import MyOrders from "../pages/MyOrders";
import SellerLogin from "../components/seller/SellerLogin";
import SellerLayout from "../pages/Seller/SellerLayout";
import AddProduct from "../pages/Seller/AddProduct";
import ProductList from "../pages/Seller/ProductList";
import Orders from "../pages/Seller/Orders";
import DeleteAccountModal from "../components/DeleteAccountModal";
import Profile from "../pages/Profile";
import ForgotPassword from "../pages/ForgotPassword";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const isForgotPasswordPath =
    useLocation().pathname.includes("forgot-password");
  const { showUserLogin, isSeller, showDeleteAccountModal } =
    useAppContext();

  return (
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath || isForgotPasswordPath ? null : <Navbar />}
      {showUserLogin && <Login />}
      {showDeleteAccountModal && <DeleteAccountModal />}

      <div className="z-10">
        <Toaster />
      </div>
      <div
        className={` ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<CategoryProducts />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address" element={<AddAddress />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/my-profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/seller"
            element={isSeller ? <SellerLayout /> : <SellerLogin />}
          >
            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </div>
      {isForgotPasswordPath || isSellerPath ? null : <Footer />}
    </div>
  );
};

export default App;
