/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Booking from "../../../models/booking.model";
import Room from "../../../models/room.model";
import Userbooking from "../../../models/userbooking.model";

dbConnect();

export default async function theBooking(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const bookings = await Booking.find()
          .populate("userId", "firstName lastName email numer")
          .populate("roomId", "roomNumer price")
          .populate(
            "userBookingId",
            "firstName lastName email numer numerOfPeople price"
          );
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
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

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
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
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

          bookingId.reservedStatus = 0;
          bookingId.userId = user;
          await bookingId.save({ validateBeforeSave: false });
        }

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

    case "PUT":
      try {
        const { authorization } = req.headers;
        const {
          textArea,
          value,
          idBooking,
          newroomId,
          roomId,
          checkIn,
          checkOut,
          bookingDays,
          reservedDays,
          checked,
        } = body;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const booking = await Booking.findById(idBooking);
        if (!booking) {
          return res.status(400).json({ message: "No Booking User" });
        }

        if (value) {
          const status = parseInt(value, 10);
          booking.reservedStatus = status;
          booking.userId = user;
          booking.paymentMade = checked;
          await booking.save({ validateBeforeSave: false });
          return res.status(200).json({
            message: "Bookings found",
          });
        }
        if (checked) {
          booking.paymentMade = checked;
          await booking.save({ validateBeforeSave: false });
          return res.status(200).json({
            message: "Bookings found",
          });
        }
        if (textArea) {
          booking.textAreaData = textArea;
          await booking.save({ validateBeforeSave: false });
          return res.status(201).json({
            message: "Bookings found",
          });
        }
        if (newroomId) {
          const newroom = await Room.findById(newroomId);
          newroom.bookings.push(booking);

          const room = await Room.findById(roomId);
          room.bookings = room.bookings.filter(
            (item) => item._id.toString() !== idBooking
          );

          await newroom.save({ validateBeforeSave: false });
          await room.save({ validateBeforeSave: false });

          return res.status(201).json({
            message: "Bookings found",
          });
        }
        if (checkIn) {
          booking.checkIn = checkIn;
          booking.checkOut = checkOut;
          booking.reservedDays = reservedDays;
          booking.bookingDays = bookingDays;
          await booking.save({ validateBeforeSave: false });
          return res.status(201).json({
            message: "Bookings found",
          });
        }
        if (!checked) {
          booking.paymentMade = checked;
          await booking.save({ validateBeforeSave: false });
          return res.status(200).json({
            message: "Bookings found",
          });
        }
        break;
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
