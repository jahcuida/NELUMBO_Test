import { conector } from "../config/mysql_conector.js";

//Guardado de mensaje y contacto
function insertMessage(name, email, subject, message, callback) {
  const sql =
    "INSERT INTO contact_messages (namess, address, subject, message) VALUES (?, ?, ?, ?)";
  conector.query(sql, [name, email, subject, message], callback);
}

export { insertMessage };
