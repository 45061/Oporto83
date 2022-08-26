const { Schema, model, models } = require("mongoose");

const boxSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userIdOpenBox: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nameBox: {
      type: String,
      required: true,
    },
    lastClosingBalance: {
      type: Number,
      required: false,
    },
    timesOpen: Number,
    lastOpening: String,
    lastClosing: String,
    activeBox: Boolean,
    initialBalance: Number,
    cashReseived: {
      type: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    },
    cashWithdrawn: {
      type: [{ type: Schema.Types.ObjectId, ref: "Withdraw" }],
    },
    existingBalance: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Box || model("Box", boxSchema);
