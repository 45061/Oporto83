/* eslint-disable default-case */
/* eslint-disable no-underscore-dangle */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";

dbConnect();

// eslint-disable-next-line consistent-return
export default async function login(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { email, password } = body;
        const user = await User.findOne({ email });

        if (!user) {
          return res
            .status(403)
            .json({ message: "Usuario o contraseña invalida" });
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          return res
            .status(403)
            .json({ message: "Usuario o contraseña invalida" });
        }

        const token = jwt.sign(
          { id: user._id },
          process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
          {
            expiresIn: 60 * 60 * 24,
          }
        );

        return res.status(201).json({
          message: "User login",
          token,
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
            bookings: user.bookings,
          },
        });
      } catch (err) {
        res.status(400).json({ message: "User could not login", data: err });
      }
  }
}
