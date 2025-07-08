import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotels,
  getHotelsByid,
  updateHotel,
} from "../controllers/hotelController.js";
import { login, register } from "../controllers/authController.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import {
  createRoom,
  deleteRoom,
  getRoomByid,
  getRooms,
  updateRoom,
} from "../controllers/roomController.js";

const router = express.Router();

//auth apis
router.post("/auth/register", register);
router.post("/auth/login", login);

//user apis

router.get("/user/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello, you are logged in");
});
router.get("/user/checkuser/:id", verifyUser, (req, res, next) => {
  res.send(
    "Hello, User you are logged in and you can update or delete your account"
  );
});
router.get("/user/checkadmin/:id", verifyAdmin, (req, res, next) => {
  res.send(
    "Hello, Admin you are logged in and you can update or delete all accounts"
  );
});

router.put("/user/edit/:id", verifyUser, updateUser);
router.delete("/user/delete/:id", verifyUser, deleteUser);
router.get("/user/", verifyAdmin, getUsers);
router.get("/user/details/:id", verifyUser, getUserById);

//hotel apis
router.post("/hotels/create", verifyAdmin, createHotel);
router.put("/hotels/edit/:id", verifyAdmin, updateHotel);
router.delete("/hotels/delete/:id", verifyAdmin, deleteHotel);
router.get("/hotels/", getHotels);
router.get("/hotels/details/:id", getHotelsByid);

//room apis
router.post("/rooms/create", verifyAdmin, createRoom);
router.post("/rooms/edit/:id", verifyAdmin, updateRoom);
router.post("/rooms/delete/:id", verifyAdmin, deleteRoom);
router.post("/rooms/", getRooms);
router.post("/rooms/details/:id", getRoomByid);

export default router;
