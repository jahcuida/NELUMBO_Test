import express from "express";
import { submitContactForm } from "../controllers/contactController.js";

//Instancia de enrutamiento
const router = express.Router();

//Establecimiento de las rutas para el renderizado de las vistas
router.get("/", function (req, res) {
  res.render("home");
});
router.get("/ToS", function (req, res) {
  res.render("ToS");
});
router.get("/contact", function (req, res) {
  res.render("contact");
});
router.post("/contact", function (req, res) {
  submitContactForm(req, res);
});

export { router };
