import React from "react";
import Navbar from "../navbar/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col ">
      <header className=" w-full">
        <Navbar />
      </header>
      <div className="flex justify-center">
        <div className="w-[1050px] flex flex-col  justify-center">
          <main className="flex-grow w-full pt-20">{children}</main>
        </div>
      </div>

      <footer className="w-full text-center py-4">
        <p>&copy; {new Date().getFullYear()} My Booking App</p>
      </footer>
    </div>
  );
};

export default Layout;
