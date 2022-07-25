/* eslint-disable import/prefer-default-export */
import { dbConnect } from "../../utils/mongoose";
import Room from "../../models/room.model";
import Booking from "../../models/booking.model";

dbConnect();

export async function getPostsRooms() {
  const rooms = await Room.find().populate(
    "bookings",
    "checkIn checkOut bookingDays"
  );
  return rooms;
}
