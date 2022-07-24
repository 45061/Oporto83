/* eslint-disable no-fallthrough */
/* eslint-disable consistent-return */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbConnect } from "../../../utils/mongoose";
import User from "../../../models/user.model";

const { transporter, verify } = require("../contact");

dbConnect();
verify(transporter);

export default async function recover(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
          res.status(404).json({ message: "User not find." });
          return;
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: 60 * 5,
        });

        await transporter.sendMail({
          from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
          to: email,
          subject: "Recuperación contraseña Oporto 83",
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
                          <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Hola ${user.firstName} ${user.lastName}</h1>
                          <p style="margin:0;">Queremos informarte que a continuación encontraras los pasos para realizar tu recuperación de contraseña.</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                          <a href="https://youtubetopv22.netlify.app/" style="text-decoration:none;"><img src="https://res.cloudinary.com/dtwhiptf2/image/upload/v1658603368/centro_ibwkg7.jpg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:35px 30px 11px 30px;font-size:0;background-color:#ffffff;border-bottom:1px solid #f0f0f5;border-color:rgba(201,201,207,.35);">
                          <!--[if mso]>
                          <table role="presentation" width="100%">
                          <tr>
                          <td style="width:145px;" align="left" valign="top">
                          <![endif]-->
                          <div class="col-sml" style="display:inline-block;width:100%;max-width:145px;vertical-align:top;text-align:left;font-family:Arial,sans-serif;font-size:14px;color:#363636;">
                            <img src=${user.avatar} width="115" alt="" style="width:115px;max-width:80%;margin-bottom:20px;">
                          </div>
                          <!--[if mso]>
                          </td>
                          <td style="width:395px;padding-bottom:20px;" valign="top">
                          <![endif]-->
                          <div class="col-lge" style="display:inline-block;width:100%;max-width:395px;vertical-align:top;padding-bottom:20px;font-family:Arial,sans-serif;font-size:16px;line-height:22px;color:#363636;">
                            <p style="margin-top:0;margin-bottom:12px;">Verifica que tu nombre corresponda con el correo.</p>
                            <p style="margin-top:0;margin-bottom:18px;">Realiza clic en el botón y realiza tu cambio de contraseña en nuestra página.</p>
                            <p style="margin:0;"><a href="http://localhost:3000/recover/${token}" style="background: #f50606; text-decoration: none; padding: 10px 25px; color: #ffffff; border-radius: 4px; display:inline-block; mso-padding-alt:0;text-underline-color:#ff3884"><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%;mso-text-raise:20pt">&nbsp;</i><![endif]--><span style="mso-text-raise:10pt;font-weight:bold;">Cambio de contraseña</span><!--[if mso]><i style="letter-spacing: 25px;mso-font-width:-100%">&nbsp;</i><![endif]--></a></p>
                          </div>
                          <!--[if mso]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:30px;background-color:#ffffff;">
                          <p style="margin:0;">Si no has realizado la solicitud de recuperar contraseña te aconsejamos que realices cambio de tu contraseña, ya que tu correo pudo ser comprometido en otro sitio web.</p>
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
          text: `Recuperando contraseña de ${user.firstName}, gracias por acompañarnos`,
        });
        return res.status(201).json({ message: "Send Mail" });
      } catch (error) {
        return console.log(error);
      }

    case "PUT":
      try {
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { email, password, confirmPassword } = body;

        const user = await User.findById(id);

        if (!user) {
          res.status(404).json({ message: "User not find." });
          return;
        }

        if (user.email !== email) {
          res.status(404).json({ message: "User do not match." });
        }

        if (password !== confirmPassword) {
          res.status(403).json({ message: "Passwords do not match" });
          return;
        }

        const encPassword = await bcrypt.hash(password, 8);

        user.password = encPassword;
        await user.save({ validateBeforeSave: false });

        await transporter.sendMail({
          from: `"${process.env.MAIL_USERNAME}" <${process.env.MAIL_USER}>`,
          to: user.email,
          subject: "Change Password in Oporto 83",
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
                          <h1 style="margin-top:0;margin-bottom:16px;font-size:26px;line-height:32px;font-weight:bold;letter-spacing:-0.02em;">Hola ${user.firstName} ${user.lastName}</h1>
                          <p style="margin:0;">Estamos comprometidos con tu seguridad por ello te informamos que has realizado un cambio de contraseña, no olvides seguirnos visitando. <a href="https://youtubetopv22.netlify.app/" style="color:#f70606;text-decoration:underline;">Oporto 83</a></p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;font-size:24px;line-height:28px;font-weight:bold;">
                          <a href="https://youtubetopv22.netlify.app/" style="text-decoration:none;"><img src="https://res.cloudinary.com/dtwhiptf2/image/upload/v1658608756/museo_iq8j7b.jpg" width="600" alt="" style="width:100%;height:auto;display:block;border:none;text-decoration:none;color:#363636;"></a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:30px;background-color:#ffffff;">
                          <p style="margin:0;">Recuerda que siempre estaremos encantado de recibirte en nuestras instalaciones.</p>
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
          </html>`,
          text: `Hola ${user.firstName} has cambiado la contraseña`,
        });

        return res.status(201).json({ message: "Change Password Ok" });
      } catch (error) {
        console.log(error);
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
