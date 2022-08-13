/* eslint-disable camelcase */
/* eslint-disable import/newline-after-import */
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import Room from "../../../models/room.model";
import User from "../../../models/user.model";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

dbConnect();

export default async function theRoom(req, res) {
  const { method, body } = req;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
  switch (method) {
    case "GET":
      try {
        const { roomId } = req.params;
        const rooms = await Room.findById(roomId);

        return res.status(200).json({
          message: "Rooms found",
          rooms,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const user = await User.findById(id);

        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const data = JSON.parse(body);
        const { roomNumer, price } = data;

        const room = await Room.create({
          roomNumer,
          price,
        });

        return res.status(201).json({ message: "Los datos llegaron", room });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const data = JSON.parse(body);
        const { _id } = data;
        const deleteRoom = await Room.findByIdAndDelete(_id);

        return res
          .status(201)
          .json({ message: "Los fueron borrados", deleteRoom });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
