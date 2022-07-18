import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import Room from "../../../models/room.model";
import User from "../../../models/user.model";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnect();

export default async function Rooms(req, res) {
  const { method, body } = req;
  // const { authorization } = req.headers;
  // const token = authorization.split(" ")[1];
  // console.log(req);
  // const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  switch (method) {
    case "GET":
      try {
        // const user = await User.findById(id);
        // if (!user) {
        //   return res.status(400).json({ message: "No User Autenticated" });
        // }
        const rooms = await Room.find();

        return res.status(200).json({
          message: "Rooms found",
          rooms,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
