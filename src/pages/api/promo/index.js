import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import Promo from "../../../models/promotion.model";
import User from "../../../models/user.model";
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

dbConnect();

export default async function thePromo(req, res) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const promos = await Promo.find();
        return res.status(200).json({
          message: "Promo found",
          promos,
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

        const data = JSON.parse(body);
        const { images } = data;
        if (!images.length) {
          console.log("error");
        }
        // console.log(gift);
        const ulrImages = await Promise.all(
          images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item.data_url);
            const { url } = result;
            return url;
          })
        );

        const promo = await Promo.create({
          ...data,
          images: ulrImages,
        });

        console.log(promo);

        return res.status(201).json({ message: "Los datos llegaron", promo });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
