const { Schema, model, models } = require("mongoose");

const bookingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    checkIn: String,
    checkOut: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Supplie || model("Booking", bookingSchema);
