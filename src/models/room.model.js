const { Schema, model, models } = require("mongoose");

const roomSchema = new Schema(
  {
    roomNumer: {
      required: true,
      type: String,
      validate: [
        {
          validator(value) {
            return models.Room.findOne({ roomNumer: value })
              .then((room) => !room)
              .catch(() => false);
          },
          message: "Ya existe una habitacion registrado con ese numero",
        },
      ],
    },
    bookings: {
      type: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    },
    price: {
      required: true,
      type: String,
    },
    sypplies: {
      type: [{ type: Schema.Types.ObjectId, ref: "Supplies" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Room || model("Room", roomSchema);
