const express = require('express');
const app = express();

const { APP_PORT, DB_URL } = require('./config');
const adminRoutes = require('./api/routes/adminRoutes');
const errorHandler = require('./api/middlewares/errorHandler');

const mongoose = require('mongoose');

/* ----------------------------------------- CORS ----------------------------------------- */

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

/* ----------------------------------------- CORS ----------------------------------------- */


/* ----------------------------------------- DATABASE CONNECTION ----------------------------------------- */

mongoose.connect(DB_URL, { useUnifiedTopology: true, useUnifiedTopology: true, useUnifiedTopology: false });

const db = mongoose.connection;
db.on('Database error => ', console.error.bind(console, 'Connection Error:'));
db.once('open', () => {
    console.log("Database Connected...!");
});
/* ------------------------------------------------------------------------------------------------------- */

/* ------------------------ MIDDLEWARES ------------------------ */
app.use(express.json());
/* -------------------------------------------------------- */

/* ------------------------ ROUTES ------------------------ */

app.get('/', function (req, res) {
    res.send(' <h1>Mantis-Dev Backend !</h1>')
})

app.use("/api/admin", adminRoutes);  // Admin Routes
/* -------------------------------------------------------- */

/*  Error Handler  */
app.use(errorHandler);  // Place your error handler after all other middlewares.
/* ---------------- */

/* ---------------------- APP Listen ---------------------- */

app.listen(APP_PORT, () => {
    console.clear();
    console.log(`Server has started on port ${APP_PORT}. ___________________________________________________________________________________________________________________`);
});

/* -------------------------------------------------------- */