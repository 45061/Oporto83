/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */

const jwt = require("jsonwebtoken");

// eslint-disable-next-line consistent-return
exports.userAuth = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ mesagge: "Su sesión expiró" });
    }

    const [_, token] = authorization.split(" ");
    if (!token) {
      return res.status(400).json({ mesagge: "Su sesión expiró" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = id;

    next();
  } catch (err) {
    res.status(500).json({ mesagge: "error en Autenticación" });
  }
};
