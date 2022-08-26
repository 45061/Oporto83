/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";
import Box from "../../../models/box.model";

dbConnect();

export default async function theBoxData(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const boxs = await Box.find().populate({
          path: "userId userIdOpenBox",
        });

        return res.status(200).json({
          message: "Boxs found",
          boxs,
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

        const box = await Box.create({
          ...req.body,
          userId: user,
          userIdOpenBox: user,
        });

        return res.status(201).json({
          message: "Los datos llegaron",
          box,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "PUT":
      try {
        const { authorization } = req.headers;
        const { balance, dataBox, lastClosing, balanceClosed } = body;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(
          token,
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY
        );
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        const box = await Box.findById(dataBox);
        if (!box) {
          return res.status(400).json({ message: "No find Box" });
        }
        if (balance) {
          box.userIdOpenBox = user;
          box.activeBox = balance.activeBox;
          box.initialBalance = balance.initialBalance;
          box.lastOpening = balance.lastOpening;
          box.timesOpen += 1;
          await box.save({ validateBeforeSave: false });
          return res.status(201).json({
            message: "Box Open",
            box,
          });
        }
        if (lastClosing) {
          box.lastClosing = lastClosing;
          box.activeBox = false;
          box.lastClosingBalance = balanceClosed;
          box.cashReseived = [];
          box.cashWithdrawn = [];
          await box.save({ validateBeforeSave: false });
          return res.status(201).json({
            message: "Box Closed",
          });
        }

        return res.status(201).json({
          message: "Los datos llegaron",
          box,
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

        const { _id } = body;

        const deleteBox = await Box.findByIdAndDelete(_id);

        return res.status(201).json({
          message: "Los datos fueron borrados",
          deleteBox,
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
