const { Schema, model, models } = require("mongoose");

const withdrawSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    concept: {
      type: String,
      required: true,
    },
    typeWithdraw: {
      type: String,
      required: true,
    },
    reasonOfWithdraw: {
      type: String,
      required: true,
    },
    boxId: {
      type: Schema.Types.ObjectId,
      ref: "Box",
      required: true,
    },
    cash: Number,
    timeTransaction: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Withdraw || model("Withdraw", withdrawSchema);
