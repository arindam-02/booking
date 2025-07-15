import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import HotelList from "../pages/hotels/HotelList";
import SingleHotel from "../pages/hotels/SingleHotel";
const RouteComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<SingleHotel />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="*" element={<h1>404! No Page Found</h1>} />
      </Routes>
    </>
  );
};

export default RouteComponent;
