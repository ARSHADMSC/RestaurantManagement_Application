import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import FoodList from "./components/FoodList";
import Food from "./components/Food";
import Email from "./components/forgot-password/Email";
import Otp from "./components/forgot-password/Otp";
import ResetPassword from "./components/forgot-password/ResetPassword";
import Home from "./components/Home";
import Navbars from "./components/Navbar";
import AddFood from "./components/Admin/AddFood";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("UserToken")) {
      setLoggedIn(true);
      // window.location.reload();
    }  
  });

  return (
    <div>
      {loggedIn && <Navbars />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/sendmail" element={<Email />} />
        <Route path="/verify-otp" element={<Otp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/food/:id" element={<Food />} />
        <Route path="/addfood" element={<AddFood />} />
        </Routes>
    </div>
  );
}

export default App;
