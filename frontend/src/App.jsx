import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import './index.css';
import Home from "./pages/home";
import { Toaster } from "sonner"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import CheckOut from "./components/Cart/CheckOut";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import OrderDeatilsPage from "./pages/OrderDeatilsPage";
import MyOrderPage from "./pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import AboutUs from "./pages/AboutUs";

import {Provider} from "react-redux";
import store from "./redux/store";
import ProtecttedRoute from "./components/Common/ProtecttedRoute";

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatpath: true}}>
    <Toaster position="top-right"  />
    
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />  {/*index = main page */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="collections/:collection" element={<CollectionPage />} />
          <Route path="product/:id" element={<ProductDetails/>}/> {/*touch on any cloth on home page render to ProductDetails page */}
          <Route path="checkout" element={<CheckOut/>} />
          <Route path="order-confirmation" element={<OrderConfirmationPage/>} />
          <Route path="order/:id" element={<OrderDeatilsPage/>} />
          <Route path="/my-orders" element={<MyOrderPage/>} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        <Route path="/admin" element={
          <ProtecttedRoute role="admin">
            <AdminLayout/> 
          </ProtecttedRoute>}>  {/* Admin layout*/}
          <Route index element={<AdminHomePage/>} />
          <Route path="users" element={<UserManagement/>} />
          <Route path="products" element={<ProductManagement/>} />
          <Route path="products/:id/edit" element={<EditProductPage/>} />
          <Route path="orders" element={<OrderManagement/>} />

        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};
export default App;