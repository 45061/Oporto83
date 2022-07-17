import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import Room from "../../../models/room.model";
import User from "../../../models/user.model";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnect();

export default async function theRoom(req, res) {
  const { method, body } = req;
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  switch (method) {
    case "GET":
      try {
        const { roomId } = req.params;
        // const user = await User.findById(id);
        // if (!user) {
        //   return res.status(400).json({ message: "No User Autenticated" });
        // }
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
        const { images, roomNumer, description, price } = data;
        if (!images.length) {
          console.log("error");
        }

        const ulrImages = await Promise.all(
          images.map(async (item) => {
            // console.log(item.data_url);
            const result = await cloudinary.uploader.upload(item.data_url);
            // console.log(result);
            const { url } = result;
            // console.log(result.url);
            // await ulrImages.push(url);
            return url;
            // return url;
          })
        );
        // await ulrImages.push(ulrIma);

        // console.log(ulrImages);

        const room = await Room.create({
          roomNumer,
          description,
          price,
          images: ulrImages,
        });

        console.log(room);

        return res.status(200).json({ message: "Los datos llegaron", room });
        // const { password, confirmPassword } = req.body;
        // if (password !== confirmPassword) {
        //   return res.status(403).json({ message: "Contraseñas no coinciden" });
        // }

        // const encPassword = await bcrypt.hash(password, 8);

        // const user = await User.create({
        //   ...req.body,
        //   password: encPassword,
        // });

        // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        //   expiresIn: 60 * 60 * 24,
        // });

        // return res.status(201).json({
        //   message: "User Created",
        //   token,
        //   user: {
        //     name: user.firstName,
        //     email: user.email,
        //   },
        // });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
