import nodemailer from "nodemailer";

//Configuración del objeto de transporte de correo
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "desarrollowebmiguelperez@gmail.com",
    pass: "athf miye rjek wadw",
  },
});

export { transporter };
