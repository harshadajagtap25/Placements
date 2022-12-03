import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";

const AllRoutes = () => {
  return (
    <div>
      <Link to="/"></Link>
      <Link to="/login"></Link>
      <Link to="/signup"></Link>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
