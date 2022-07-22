const { Schema, model, models } = require("mongoose");

const nameRegex = /[a-zA-Z]+/;
const emailRegex = /^[^@]+@[^@]+.[^@]+$/;
const strongPass =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

const userSchema = new Schema(
  {
    firstName: {
      required: true,
      type: String,
      match: [nameRegex, "Nombre no debe contener numeros"],
    },
    lastName: {
      required: true,
      type: String,
      match: [nameRegex, "Nombre no debe contener numeros"],
    },
    email: {
      type: String,
      required: true,
      match: [emailRegex, "Email Invalido"],
      validate: [
        {
          validator(value) {
            return models.User.findOne({ email: value })
              .then((user) => !user)
              .catch(() => false);
          },
          message: "Ya existe un usuario registrado con ese correo",
        },
      ],
    },
    numer: {
      requiered: [true, "El número es requerido"],
      type: String,
    },
    password: {
      required: [true, "La contraseña es requerida"],
      match: [strongPass, "La contraseña no es segura"],
      type: String,
    },
    typeUser: {
      required: true,
      type: Boolean,
    },
    bookings: {
      type: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.User || model("User", userSchema);
