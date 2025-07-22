import React from "react";
import { featuredCities } from "../../constants/FeaturedCities";
import "./Featured.css";

const Featured = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {featuredCities.map((city, index) => (
          <div
            className="featuredItem transition-transform duration-700 ease-in-out transform hover:scale-110 cursor-pointer"
            key={index}
          >
            <img
              src={city.image}
              alt="featuredImage"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1 className="text-3xl font-extrabold">{city.name}</h1>
              <h5 className="text-xl font-semibold">
                {`${city.properties} Properties`}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Featured;
