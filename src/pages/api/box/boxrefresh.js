import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Box from "../../../models/box.model";
import Payment from "../../../models/payment.model";
import Withdraw from "../../../models/withdraw.model";

dbConnect();

export default async function theBoxData(req, res) {
  const { method } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "GET":
      try {
        const id = authorization.split(" ")[1];

        const box = await Box.findById(id).populate({
          path: "userId userIdOpenBox cashReseived cashWithdrawn",
        });
        return res.status(201).json({
          message: "Boxs found",
          box,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
