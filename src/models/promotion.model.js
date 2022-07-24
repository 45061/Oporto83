const { Schema, model, models } = require("mongoose");

const promoSchema = new Schema(
  {
    namePromo: {
      required: true,
      type: String,
      validate: [
        {
          validator(value) {
            return models.Promo.findOne({ namePromo: value })
              .then((room) => !room)
              .catch(() => false);
          },
          message: "Ya existe una promoción registrada con este nombre",
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
    gift: {
      required: true,
      type: Array,
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

export default models.Promo || model("Promo", promoSchema);
