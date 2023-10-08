import { insertMessage } from "../models/contactModel.js";
import { transporter } from "../config/nodemailerConfig.js";

//Envío del formulario
function submitContactForm(req, res) {
  const name = req.body.namess;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  insertMessage(name, email, subject, message, function (err, result) {
    if (err) {
      //   console.error('Error al insertar datos en la bbdd:', err);
      let popupMessage = "Error al enviar el formulario";
      let popupScript = `<script>alert('${popupMessage}'); window.history.back();</script>`;
      res.send(popupScript);
    } else {
      //   console.log('Datos insertados en la bbdd:', result);
      sendEmail(name, email);
      let popupMessage = "¡Formulario enviado!";
      let popupScript = `<script>alert('${popupMessage}'); window.history.back();</script>`;
      res.send(popupScript);
    }
  });
}

//Envío de correo
function sendEmail(name, email) {
  const htmlContent = `
    <h1>Hola ${name}</h1>
    <br>
    <h2>Gracias por contactarnos</h2>
    <br>
    <p>Pronto nos pondremos en contacto contigo.</p>
    `;
  const mailOptions = {
    from: "Sensitive",
    to: email,
    subject: "formulario de contacto recibido",
    html: htmlContent,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}

export { submitContactForm };
