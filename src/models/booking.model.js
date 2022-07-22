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
    reservedDays: {
      type: Number,
      require: false,
    },
    reservedStatus: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Booking || model("Booking", bookingSchema);
