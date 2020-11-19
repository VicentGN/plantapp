require('dotenv').config();
const app = require('./app');
require('./database');

// Carga del servidor en método principal

async function main() {
  await app.listen(app.get('port'));
  console.log(`Escuchando por el puerto ${app.get('port')}`);
}

main();


// const express = require("express");
// const app = express();
// // const multer = require("multer");
// const bodyParser = require('body-parser');
// const mysql = require("mysql");
// const cors = require("cors");
// const port = 4000;

// // Instalamos el middelware que permite la lectura de datos en formato JSON y X-WWW-FORM-URLECONDED procedentes de frontend
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());

// // Pool de conexión a la base de datos
// var config = {
//   host: "localhost",
//   user: "plantapp_user",
//   password: "1234",
//   database: "plantappdb",
// };
// const pool = mysql.createPool(config);

// let checkData = (req) => {
//   if (
//     req.body.name == "" ||
//     req.body.sample == "" ||
//     req.body.habitat == "" ||
//     req.body.coordinates == []

//   ) {
//     return false;
//   } else {
//     return true;
//   }

// };

// app.get("/api/plants", (req, res) => {
//   pool.query("SELECT * FROM PLANTS WHERE enabled = ?", [1], (err, response) => {
//     if (err) throw err;
//     res.send(response);
//   });
// });

// app.get("/api/plants/:id_plant", (req, res) => {
//   pool.query(
//     "SELECT * FROM PLANTS WHERE id_plant = ?",
//     [req.params.id_plant],
//     (err, response) => {
//       if (err) {
//         res.send(err);
//       } else {
//         res.status(200).send(response);
//       }
//     }
//   );
// });

// app.post("/api/plants/new", (req, res) => {
//   if (checkData(req)) {
//     pool.query(
//       "INSERT INTO PLANTS(id_plant, name, sample, habitat, date, lat, lng, enabled) VALUES (?,?,?,?,?,?,?,?)",
//       [
//         Math.floor(Math.random() * 100000),
//         req.body.name,
//         req.body.sample,
//         req.body.habitat,
//         new Date(),
//         req.body.coordinates[0],
//         req.body.coordinates[1],
//         1,
//       ],
//       (err, response) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.status(200).send(response);
//         }
//       }
//     );
//   } else {
//     res.status(400).send({ message: "Datos introducidos incorrectamente" });
//   }
// });

// app.put("/api/plants/update", (req, res) => {
//   if (checkData(req)) {
//     pool.query(
//       "UPDATE PLANTS SET name = ?, sample = ?, habitat = ?, date = ?, lat = ?, lng = ?, enabled = ? WHERE id_plant = ?",
//       [
//         req.body.name,
//         req.body.sample,
//         req.body.habitat,
//         new Date(),
//         req.body.coordinates[0],
//         req.body.coordinates[1],
//         1,
//         req.body.id_plant,
//       ],
//       (err, response) => {
//         if (err) {
//           res.send(err);
//         } else {
//           res.status(200).send(response);
//         }
//       }
//     );
//   } else {
//     res.status(400).send({ message: "Datos introducidos incorrectamente" });
//   }
// });

// app.put("/api/plants/del", (req, res) => {
//   pool.query("UPDATE PLANTS SET enabled = ? WHERE id_plant = ?", [
//     0,
//     req.body.id_plant,
//   ]),
//     (err, result) => {
//       if (err) {
//         res.send(err);
//       }
//       res.send(result);
//     };
// });

// app.listen(port, () => {
//   console.log(`Escuchando por el puerto ${port}`);
// });
