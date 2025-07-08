import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

//crate room
export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    // Add the new room ID to the hotel's rooms array
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//update

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id, // Room ID from the route
      { $set: req.body }, // Set fields from the request body
      { new: true } // Return the updated document
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//delete
export const deleteRoom = async (req, res) => {
  const roomlId = req.params.id;

  try {
    await Room.findByIdAndDelete(roomlId);
    res.status(200).json({ message: "Room has been deleted!" });
  } catch (err) {
    next(err);
  }
};

//list

export const getRooms = async (req, res, next) => {
  try {
    let roomlList = await Room.find();
    res.status(200).json({ roomCount: roomlList.length, roomlList });
  } catch (err) {
    next(err);
  }
};

//details by id

export const getRoomByid = async (req, res, next) => {
  const roomlId = req.params.id;

  try {
    const roomDetails = await Room.findById(roomlId);

    if (!roomDetails) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.status(200).json(roomDetails);
  } catch (err) {
    next(err);
  }
};
