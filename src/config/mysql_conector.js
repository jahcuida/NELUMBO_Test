import mysql from "mysql";

//Conexión con la base de datos
const conector = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "prueba_nodejs",
});

export { conector };
