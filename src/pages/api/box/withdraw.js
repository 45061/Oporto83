import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Box from "../../../models/box.model";
import Withdraw from "../../../models/withdraw.model";

dbConnect();

export default async function theWithdraw(req, res) {
  const { method, body } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "POST":
      try {
        const {
          boxId,
          concept,
          cash,
          typeWithdraw,
          reasonOfWithdraw,
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

        const box = await Box.findById(boxId);

        if (!box) {
          return res.status(400).json({ message: "No find Box" });
        }

        const withdraw = await Withdraw.create({
          boxId: box,
          userId: user,
          reasonOfWithdraw,
          typeWithdraw,
          cash,
          concept,
          timeTransaction,
        });
        box.cashWithdrawn.push(withdraw);
        await box.save({ validateBeforeSave: false });

        return res.status(201).json({
          message: "Los datos llegaron",
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "GET":
      try {
        const withdraw = await Withdraw.find().populate({
          path: "userId boxId",
        });

        return res.status(201).json({
          message: "Send Data",
          withdraw,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
