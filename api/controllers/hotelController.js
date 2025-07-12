//testing

import Hotel from "../models/Hotel.js";

//create

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
//update

export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id, // Hotel ID from the route
      { $set: req.body }, // Set fields from the request body
      { new: true } // Return the updated document
    );

    if (!updatedHotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteHotel = async (req, res) => {
  const hotelId = req.params.id;
  const isHotelexists = await Hotel.findById(hotelId);
  if (!isHotelexists)
    return res.status(404).json({ message: "Hotel not found" });

  try {
    await Hotel.findByIdAndDelete(hotelId);
    res.status(200).json({ message: "Hotel has been deleted!" });
  } catch (err) {
    next(err);
  }
};

//list

export const getHotels = async (req, res, next) => {
  try {
    let hotelList = await Hotel.find();
    res.status(200).json({ hotelCount: hotelList.length, hotelList });
  } catch (err) {
    next(err);
  }
};

//details by id

export const getHotelsByid = async (req, res, next) => {
  const hotelId = req.params.id;

  try {
    const hotelDetails = await Hotel.findById(hotelId);

    if (!hotelDetails) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    res.status(200).json(hotelDetails);
  } catch (err) {
    next(err);
  }
};
