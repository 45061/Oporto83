const { Schema, model, models } = require("mongoose");

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    userBookingId: {
      type: Schema.Types.ObjectId,
      ref: "Userbooking",
      required: false,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: String,
    checkOut: String,
    reservedDays: {
      type: Number,
      require: false,
    },
    bookingDays: { type: Array, require: true },
    reservedStatus: Number,
    textAreaData: String,
    paymentMade: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Booking || model("Booking", bookingSchema);
