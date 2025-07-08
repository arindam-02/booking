import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const { username, email, phone, password, isAdmin } = req.body;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) return res.json("User Already Exist");

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const newuser = new User({
      ...req.body,
      password: hashedPassword,
    });
    // const newuser = new User({
    //   username: req.body.username,
    //   email: req.body.email,
    //   phone: req.body.phone,
    //   password: hashedPassword,
    //   isAdmin: req.body.isAdmin,
    // });

    await newuser.save();

    res.status(200).json("User has been created!");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, isAdmin } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(createError(404, "User not found!"));

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "1d" } // Optional: Adjust expiration as needed
    );

    const { password: _, ...userData } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ token, user: userData });
  } catch (err) {
    next(err);
  }
};
