import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Booking from "../../../models/booking.model";
import Room from "../../../models/room.model";

dbConnect();

export default async function theBooking(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const bookings = await Booking.find();
        return res.status(200).json({
          message: "Bookings found",
          bookings,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }
        // const data = JSON.parse(body);

        const { roomId } = body;

        const room = await Room.findById(roomId);
        if (!room) {
          return res.status(400).json({ message: "No find Room" });
        }

        const booking = await Booking.create({
          ...req.body,
          userId: user,
          roomId: room,
        });

        user.bookings.push(booking);
        room.bookings.push(booking);

        await user.save({ validateBeforeSave: false });
        await room.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Los datos llegaron",
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
            bookings: user.bookings,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const { roomId, userId, _id } = body;
        if (await Booking.exists({ roomId, userId })) {
          const bookingId = await Booking.findById(_id);

          const extractId = bookingId._id;

          const string = extractId.toString();

          const room = await Room.findById(roomId);
          room.bookings = room.bookings.filter(
            (item) => item._id.toString() !== string
          );

          await room.save({ validateBeforeSave: false });

          user.bookings = user.bookings.filter(
            (item) => item._id.toString() !== string
          );

          await user.save({ validateBeforeSave: false });
        }

        // const data = JSON.parse(body);
        // const { _id } = data;
        // const deleteBooking = await Booking.findByIdAndDelete(_id);

        return res.status(201).json({
          message: "Los datos fueron borrados",
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
            bookings: user.bookings,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
