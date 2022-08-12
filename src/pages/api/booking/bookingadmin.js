/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Booking from "../../../models/booking.model";
import Room from "../../../models/room.model";
import Userbooking from "../../../models/userbooking.model";

dbConnect();

export default async function theBookingData(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const { roomId } = body.dataBooking;
        console.log("esto es roomId", roomId);

        const room = await Room.findById(roomId);
        if (!room) {
          return res.status(400).json({ message: "No find Room" });
        }
        console.log("data que debe entrar", req.body.formData);
        const userbooking = await Userbooking.create({
          ...req.body.formData,
        });

        console.log("este es userBooking", userbooking);

        const booking = await Booking.create({
          ...req.body.dataBooking,
          userBookingId: userbooking,
          roomId: room,
        });

        // user.bookings.push(booking);
        room.bookings.push(booking);

        // await user.save({ validateBeforeSave: false });
        await room.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Los datos llegaron",
          // user: {
          //   name: user.firstName,
          //   lastName: user.lastName,
          //   typeUser: user.typeUser,
          //   email: user.email,
          //   bookings: user.bookings,
          // },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}