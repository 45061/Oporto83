import { dbConnect } from "../../../utils/mongoose";
import Room from "../../../models/room.model";
import Booking from "../../../models/booking.model";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnect();

export default async function Rooms(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const rooms = await Room.find().populate(
          "bookings",
          "checkIn checkOut bookingDays"
        );

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
