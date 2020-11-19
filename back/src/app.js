const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configuracion básica
app.set('port', process.env.PORT || 5000);


// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// API Routes

app.use('/api/plants', require('./routes/plants'));

module.exports = app;
