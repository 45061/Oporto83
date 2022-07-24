/* eslint-disable no-underscore-dangle */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";

const { transporter, verify } = require("../contact");

dbConnect();
verify(transporter);

const sendMail = async (user) => {
  await transporter.sendMail({
    from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
    to: user.email,
    subject: "Bienvenido a Oporto 83",
    html: `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <meta name="x-apple-disable-message-reformatting">
      <title></title>
      <!--[if mso]>
      <style>
        table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
        div, td {padding:0;}
        div {margin:0 !important;}
      </style>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
      <![endif]-->
      <style>
        table, td, div, h1, p {
          font-family: Arial, sans-serif;
        }
        @media screen and (max-width: 530px) {
          .unsub {
            display: block;
            padding: 8px;
            margin-top: 14px;
            border-radius: 6px;
            background-color: #555555;
            text-decoration: none !important;
            font-weight: bold;
          }
          .col-lge {
            max-width: 100% !important;
          }
        }
        @media screen and (min-width: 531px) {
          .col-sml {
            max-width: 27% !important;
          }
          .col-lge {
            max-width: 73% !important;
          }
        }
      </style>
    </head>
    <body style="margin:0;padding:0;word-spacing:normal;background-color:#939297;">
      <div role="article" aria-roledescription="email" lang="en" style="text-size-adjust:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#939297;">
        <table role="presentation" style="width:100%;border:none;border-spacing:0;">
          <tr>
            <td align="center" style="padding:0;">
              <!--[if mso]>
              <table role="presentation" align="center" style="width:600px;">
              <tr>
              <td>
              <![endif]-->
              <table role="presentation" style="width:94%;max-width:600px;border:none;border-spacing:0;text-align:left;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                <tr>
                  <td style="padding:40px 30px 30px 30px;text-align:center;font-size:24px;font-weight:bold;">
                    <a href="https://youtubetopv22.netlify.app/" style="text-decoration:none;"><img src="https://res.cloudinary.com/dtwhiptf2/image/upload/v1658600942/oporto_reqsof.png" width="165" alt="Logo" style="width:165px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px;background-color:#ffffff;">
                    <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Bienvenido ${user.firstName} ${user.lastName} a Oporto 83!</h1>
                    <p style="margin:0;">Estamos agradecidos de que hayas decidido acompañarnos y realizar tus reservas en nuestra página, <a href="https://youtubetopv22.netlify.app/" style="color:#4d70b5;text-decoration:underline;">Oporto 83</a>, esperamos sea de tu agrado.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                    <a href="https://youtubetopv22.netlify.app/" style="text-decoration:none;"><img src="https://res.cloudinary.com/dtwhiptf2/image/upload/v1658601112/monserrate_y93g3n.jpg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:30px 30px 10px 30px;background-color:#ffffff;">
                    <p style="margin:0;">Espero disfrutes de nuestra página, y estes enterado de nuestras promociones.</p>
                  </td>
                </tr>
                <tr>
                <td style="padding:10px;background-color:#ffffff;display: flex;justify-content: center;align-items: center;gap: 5%;">
                  <img src="https://res.cloudinary.com/dtwhiptf2/image/upload/v1658600942/oporto_reqsof.png" width="165" alt="Logo" style="width:100px;max-width:80%;height:auto;border:none;text-decoration:none;color:#ffffff;">
                  <div>
                  <div style="padding:0;margin:0"><p style="margin:0;color:#4d70b5;font-size: 12px;margin-block-start:0;margin-block-end:0;">Oporto 83.</p></div>
                  <div><p style="margin:0;color:#4d70b5;font-size: 12px;margin-block-start:0;margin-block-end:0;">Dirección.: Calle 23 # 83 - 20</p></div>
                  <div><p style="margin:0;color:#4d70b5;font-size: 12px;margin-block-start:0;margin-block-end:0;">Cel.: (+57) 319 798 1552</p></div>
                </div>
                </td>
              </tr>
              </table>
              <!--[if mso]>
              </td>
              </tr>
              </table>
              <![endif]-->
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
    `,
    text: `Bienvenido ${user.firstName} ${user.lastName} a Oporto 83, gracias por desear reservar con nosotros`,
  });
};

export default async function handler(req, res) {
  const { method, body } = req;
  const { authorization } = req.headers;

  switch (method) {
    case "GET":
      try {
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(id);
        if (!user) {
          return res.status(400).json({ message: "No find User" });
        }

        return res.status(200).json({
          message: "User found",
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
            bookings: user.bookings,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const { password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
          return res.status(403).json({ message: "Contraseñas no coinciden" });
        }

        const encPassword = await bcrypt.hash(password, 8);

        const user = await User.create({
          ...req.body,
          password: encPassword,
        });
        sendMail(user);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 60 * 60 * 24,
        });

        return res.status(201).json({
          message: "User Created",
          token,
          user: {
            name: user.firstName,
            lastName: user.lastName,
            typeUser: user.typeUser,
            email: user.email,
            bookings: user.bookings,
          },
        });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
