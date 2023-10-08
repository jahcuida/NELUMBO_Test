import express from "express";
import { router } from "./src/routes/routes.js";

//Instancia del objeto 'express'
const app = express();

//Para procesar datos JSON
app.use(express.json());

//Para procesar los datos del formulario a través de POST
app.use(express.urlencoded({ extended: true }));

//Configuración archivos estáticos
app.use(express.static("./src"));

//Middleware para rastear la ruta y crear posteriormente el subrayado de los elementos de la barra de navegación
app.use(function (req, res, next) {
  // Se obtiene la URL actual
  const url = req.url;
  // Se define una variable para rastrear la página
  res.locals.currentPage = url;
  // Se llama a next() para pasar al siguiente middleware o ruta
  next();
});

//Configuración pug
app.set("views", "./src/views");
app.set("view engine", "pug");

//Uso de las rutas
app.use("/", router);

//Inicio del servidor
app.listen("8000", function () {
  console.log("Server running on => http://localhost:8000/");
});
