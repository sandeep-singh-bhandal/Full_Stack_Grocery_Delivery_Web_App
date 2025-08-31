import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";

axios.defaults.withCredentials = true; // to send cookies
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  //Fetch Seller Status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) setIsSeller(true);
      else setIsSeller(false);
    } catch (err) {
      setIsSeller(false);
    }
  };

  // Fetch products from backend (dummy here)
  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  // Add to cart function
  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  // Update Cart function
  const updateCart = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    delete cartData[itemId];
    toast.success("Item removed from cart");
    setCartItems(cartData);
  };

  // Get cart item count
  const getCartItemCount = () => {
    let count = 0;
    for (const item in cartItems) {
      count += cartItems[item];
    }
    return count;
  };

  // Get cart total amount
  const getCartAmount = () => {
    let amount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((prod) => prod._id === item);
      if (cartItems[item] > 0) {
        amount += itemInfo.offerPrice * cartItems[item];
      }
    }
    return Math.floor(amount * 100) / 100;
  };

  useEffect(() => {
    fetchSeller();
    fetchProducts();
  }, []);

  const value = {
    user,
    setUser,
    isSeller,
    setIsSeller,
    navigate,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    cartItems,
    addToCart,
    updateCart,
    removeFromCart,
    searchQuery,
    setSearchQuery,
    axios,
    getCartItemCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
