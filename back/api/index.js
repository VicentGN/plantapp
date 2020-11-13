const express = require("express");
const app = express();
const multer = require("multer");
const mysql = require("mysql");
const cors = require("cors");
const port = 4000;

app.use(cors());

// Configuración personalizada del almacenamiento de imágenes con Multer
var storage = multer.diskStorage({
  destination: "./images",
});
var upload = multer({ storage });

// Pool de conexión a la base de datos
var config = {
  host: "localhost",
  user: "plantapp_user",
  password: "1234",
  database: "plantappdb",
};
const pool = mysql.createPool(config);

let checkData = (req) => {
  // let dniExpresion = new RegExp(/^[0-9]{8,8}[A-Z]$/);
  if (
    req.body.name == "" ||
    req.body.sample == "" ||
    req.body.habitat == "" ||
    // req.body.legiti_dni == "" ||
    // dniExpresion.test(req.body.legiti_dni) == false ||
    // req.body.determini_dni == "" ||
    // dniExpresion.test(req.body.determini_dni) == false ||
    req.body.coordinates == []
    // req.file.filename == undefined
  ) {
    return false;
  } else {
    return true;
  }

};

app.get("/api/plants", (req, res) => {
  pool.query("SELECT * FROM PLANTS WHERE enabled = ?", [1], (err, response) => {
    if (err) throw err;
    res.send(response);
  });
});

app.get("/api/plants/:id_plant", (req, res) => {
  pool.query(
    "SELECT * FROM PLANTS WHERE id_plant = ?",
    [req.params.id_plant],
    (err, response) => {
      if (err) {
        res.send(err);
      } else {
        res.status(200).send(response);
      }
    }
  );
});

app.post("/api/plants/new", (req, res) => {
  if (checkData(req)) {
    pool.query(
      //"INSERT INTO PLANTS(id_plant, name, sample, habitat, date, legiti_dni, determini_dni, lat, lng, plant_image_ref, enabled) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      "INSERT INTO PLANTS(id_plant, name, sample, habitat, date, lat, lng, enabled) VALUES (?,?,?,?,?,?,?,?)",
      [
        Math.floor(Math.random() * 100000),
        req.body.name,
        req.body.sample,
        req.body.habitat,
        new Date(),
        // req.body.legiti_dni,
        // req.body.determini_dni,
        req.body.coordinates.split(",")[0],
        req.body.coordinates.split(",")[1],
        // req.file.filename,
        1,
      ],
      (err, response) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(response);
        }
      }
    );
  } else {
    res.status(400).send({ message: "Datos introducidos incorrectamente" });
  }
});

app.put("/api/plants/update", (req, res) => {
  if (checkData(req)) {
    pool.query(
      // "UPDATE PLANTS SET name = ?, sample = ?, habitat = ?, date = ?, legiti_dni = ?, determini_dni = ?, lat = ?, lng = ?, plant_image_ref = ?, enabled = ? WHERE id_plant = ?",
      "UPDATE PLANTS SET name = ?, sample = ?, habitat = ?, date = ?, lat = ?, lng = ?, enabled = ? WHERE id_plant = ?",
      [
        req.body.name,
        req.body.sample,
        req.body.habitat,
        new Date(),
        // req.body.legiti_dni,
        // req.body.determini_dni,
        req.body.coordinates.split(",")[0],
        req.body.coordinates.split(",")[1],
        // req.file.filename,
        1,
        req.body.id_plant,
      ],
      (err, response) => {
        if (err) {
          res.send(err);
        } else {
          res.status(200).send(response);
        }
      }
    );
  } else {
    res.status(400).send({ message: "Datos introducidos incorrectamente" });
  }
});

app.put("/api/plants/del", (req, res) => {
  pool.query("UPDATE PLANTS SET enabled = ? WHERE id_plant = ?", [
    0,
    req.body.id_plant,
  ]),
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(response);
      }
    };
});

app.listen(port, () => {
  console.log(`Escuchando por el puerto ${port}`);
});
