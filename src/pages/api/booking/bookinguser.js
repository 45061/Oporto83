import { dbConnect } from "../../../utils/mongoose";
import Booking from "../../../models/booking.model";
import Room from "../../../models/room.model";

dbConnect();

export default async function theBookingData(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { bookingId } = body;

        const booking = await Booking.findById(bookingId);

        if (!booking) {
          return res.status(400).json({ message: "No find Booking" });
        }
        const { roomId } = booking;

        const room = await Room.findById(roomId);

        return res.status(201).json({ room, booking });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
