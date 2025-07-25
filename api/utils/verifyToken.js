import jwt from "jsonwebtoken";
import { createError } from "./error.js";

//verify token
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(createError(401, "You are not authenticated!"));

  //verify token

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }

    req.user = user;

    next();
  });
};

//verify user
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//verify admin
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
