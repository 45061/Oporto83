const { Schema, model, models } = require("mongoose");

const userbookingSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
    },
    lastName: {
      required: true,
      type: String,
    },
    email: {
      type: String,
    },
    numer: {
      requiered: true,
      type: String,
    },
    numerOfPeople: {
      requiered: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    bookingOfPlace: {
      required: true,
      type: String,
    },
    breakfast: {
      required: true,
      type: String,
    },
    parking: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Userbooking || model("Userbooking", userbookingSchema);
