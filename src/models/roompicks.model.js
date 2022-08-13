const { Schema, model, models } = require("mongoose");

const roomPicksSchema = new Schema(
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
    images: {
      required: true,
      type: Array,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
    publicIds: {
      required: true,
      type: Array,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.RoomPicks || model("RoomPicks", roomPicksSchema);
