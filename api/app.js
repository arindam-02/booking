import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import APIRoutes from "./routes/APIRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
// const URI = process.env.MONGO_URI || "mongodb://localhost:27017/";
const URI = "mongodb://localhost:27017/booking";

/* ---------------- Middlewares ---------------- */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", APIRoutes);

//error handling middleware
app.use((err, req, res, next) => {
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went Wrong";
  return res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMessage,
    stack: err.stack,
  });
});

mongoose
  .connect(URI)
  .then(() => {
    console.log("Connecting to DB ...");

    app.listen(PORT, () => {
      console.log("DB is successfully connected !!!");
      console.log("Server is running on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
