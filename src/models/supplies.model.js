const { Schema, model, models } = require("mongoose");

const supplieSchema = new Schema(
  {
    nameSuplie: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Supplie || model("Supplie", supplieSchema);
