/* eslint-disable import/prefer-default-export */
import { dbConnect } from "../../utils/mongoose";
import User from "../../models/user.model";
import Room from "../../models/room.model";
import Booking from "../../models/booking.model";
import Promo from "../../models/promotion.model";

dbConnect();

export async function getPostsRooms() {
  const rooms = await Room.find().populate(
    "bookings",
    "checkIn checkOut bookingDays"
  );
  return rooms;
}

export async function getPostsPromo() {
  const promos = await Promo.find();
  return promos;
}

export async function getPostsBookings() {
  const promos = await Booking.find()
    .populate("userId", "firstName lastName email numer")
    .populate("roomId", "roomNumer price");
  return promos;
}
