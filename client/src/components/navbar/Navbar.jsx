import React from "react";
import { IoHelpCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"; // Assuming your shadcn button path
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navContainer">
      <div className=" flex flex-col items-center mx-auto py-4">
        <div className="navbar w-8/12 flex justify-between items-center mx-auto py-4">
          <div className="logo">
            <h1 className="text-3xl">EasyHotels.com</h1>
          </div>
          <div className="navItems flex items-center gap-2">
            {/* select Currency */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="ghost-btn">
                  INR
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select your currency</p>
              </TooltipContent>
            </Tooltip>

            {/* select language */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="ghost-btn">
                  EN
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Select your language</p>
              </TooltipContent>
            </Tooltip>

            {/* Contact customer service */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Help"
                  className="ghost-btn"
                >
                  <IoHelpCircleOutline className="text-2xl" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contact your customer</p>
              </TooltipContent>
            </Tooltip>

            <Button variant="ghost" className="ghost-btn">
              List your property
            </Button>
            <Button variant="secondary" className="text-blue-700">
              Register
            </Button>
            <Button variant="secondary" className="text-blue-700">
              Sign In
            </Button>
          </div>
        </div>

        <nav className=" w-8/12 flex justify-start items-center gap-4 py-2 text-[16px] font-normal ">
          <a
            href="/"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Stays
          </a>
          <a
            href="/flight"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Flight
          </a>
          <a
            href="https://booking-in.lastminute.com/"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Flight + Hotel
          </a>
          <a
            href="/cars"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Car rental
          </a>
          <a
            href="/attractions"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Attractions
          </a>
          <a
            href="/taxi"
            className="nav-link border-0  px-5 py-1.5 rounded-full highlited-nav-link"
          >
            Airport taaxies
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
