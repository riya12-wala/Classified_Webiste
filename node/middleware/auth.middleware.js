import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const auth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);

      const userData = await userModel
        .findOne({ _id: decoded.data.id })
        .select("-password");

      req.user = userData;
      if (decoded) {
        next();
      } else {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
    } else {
      return res.status(401).json({ message: "Access denied" });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const admin = (req, rex, next) => {
  try {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You don't have an admin access." });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong", success: false });
  }
};
