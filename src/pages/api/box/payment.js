import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Box from "../../../models/box.model";
import Room from "../../../models/room.model";
import Payment from "../../../models/payment.model";

dbConnect();

export default async function thePayment(req, res) {
  const { method, body } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "POST":
      try {
        const {
          roomId,
          boxId,
          concept,
          cash,
          typePayment,
          reasonOfPay,
          timeTransaction,
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
        const room = await Room.findById(roomId);

        if (!room) {
          return res.status(400).json({ message: "No find Room" });
        }
        const box = await Box.findById(boxId);

        if (!box) {
          return res.status(400).json({ message: "No find Box" });
        }

        const payment = await Payment.create({
          boxId: box,
          userId: user,
          roomId: room,
          reasonOfPay,
          typePayment,
          cash,
          concept,
          timeTransaction,
        });
        box.cashReseived.push(payment);
        await box.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Los datos llegaron",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "GET":
      try {
        const payment = await Payment.find().populate({
          path: "userId boxId roomId",
        });

        return res.status(201).json({
          message: "Los datos llegaron",
          payment,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
