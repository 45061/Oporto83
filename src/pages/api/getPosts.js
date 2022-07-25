/* eslint-disable import/prefer-default-export */
import { dbConnect } from "../../utils/mongoose";
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
