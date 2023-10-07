import express  from 'express';
import nodemailer from 'nodemailer';
import {conector} from './src/mysql_conector.js';

const app = express();
app.use(express.json());
app.listen('8000', function (){
    console.log('iniciada en el puerto 8000')
})
app.use(express.urlencoded({ extended: true }));
//Configuración pug
app.set('views', './src/views')
app.set('view engine', 'pug')

const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes cambiarlo a otro proveedor de correo electrónico o configurar tu propio servidor SMTP
    auth: {
      user: 'desarrollowebmiguelperez@gmail.com', // Tu dirección de correo electrónico
      pass: 'athf miye rjek wadw', // Contraseña de aplicación
    },
  });
//Configuración archivos estáticos
app.use(express.static('./src'))

app.use(function(req, res, next) {
    // Obtén la URL solicitada
    const url = req.url;

    // Define una variable para rastrear la página actual
    res.locals.currentPage = url;

    // Llama a next() para pasar al siguiente middleware o ruta
    next();
});


app.get('/',function(req,res){
    // res.send('todo bien iniciado valee?')

    res.render('home')
})
app.get('/ToS',function(req,res){
    // res.send('todo bien iniciado valee?')
    res.render('ToS')
})
app.get('/contact',function(req,res){
    // res.send('todo bien iniciado valee?')
    res.render('contact')
})
app.post('/contact', function(req, res){
    const name = req.body.namess;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const htmlContent = `
        <h1>Hola ${name}</h1>
        <br>
        <h2>Gracias por contactarnos</h2>
        <br>
        <p>Pronto nos pondremos en contacto contigo.</p>
  `;
    // Aquí puedes hacer lo que quieras con los datos, por ejemplo, mostrarlos en la consola
    // console.log('Nombre:', name);
    // console.log('Email:', email);
    // console.log('Asunto:', subject);
    // console.log('Mensaje:', message);
    const sql = 'INSERT INTO contact_messages (namess, address, subject, message) VALUES (?, ?, ?, ?)';
    conector.query(sql, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error('Error al insertar datos en la base de datos:', err);
        res.send('Error al procesar la solicitud.');
      } else {
        console.log('Datos insertados en la base de datos:', result);
        res.send('¡Formulario enviado y datos guardados en la base de datos!');
      }
    });
    const mailOptions = {
        from: 'Sensitive', // Tu dirección de correo electrónico
        to: email, // La dirección de correo electrónico del destinatario (obtenida del formulario)
        subject: 'formulario de contacto recibido',
        html: htmlContent,
      };
    
      // Envía el correo electrónico
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error al enviar el correo electrónico:', error);
          res.send('Error al enviar el correo electrónico.');
        } else {
          console.log('Correo electrónico enviado:', info.response);
          res.send('¡Correo electrónico enviado con éxito!');
        }
      });
  });
  
    // Puedes redirigir a una página de confirmación o mostrar un mensaje de éxito

// app.post('/contact',function(req,res){
//     let name = req.params.name;
//     let email = req.params.email;
//     let subject = req.params.subject;
//     let message = req.params.message;
//     console.log(name,email,subject,message)
//     res.send('Fol');
// })

// app.use(express.urlencoded({ extended: true }));

// app.post('/contact', (req, res) => {
//     const data = req.contact;

//     // Utiliza el método de base de datos saveMessage para guardar los datos
//     saveMessage(data, (err, result) => {
//       if (err) {
//         res.status(500).send('Error al guardar en la base de datos');
//       } else {
//         console.log('guardad??')
//         res.redirect('/contact'); // Redirige a la página del contact
//       }
//     });
//   });