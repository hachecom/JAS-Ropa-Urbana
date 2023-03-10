require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const path = require("path");
const session = require('express-session');
const app = express();

//Requires to routes
const authRoute = require("./routes/auth.routes");
const usersRoute = require("./routes/users.routes");
const navRoute = require("./routes/nav.routes");
const { title } = require("process");

//Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(json())


// Routes
app.use("/users", usersRoute);
app.use("/", authRoute);
app.use("/", navRoute);



// Static Files
app.use(express.static(__dirname +'/public'));
// Specific folder example
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/imgagenes', express.static(__dirname + 'public/imagenes'))

// Set View's
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')






//Elimina el cache, para evitar errores con Logout
app.use(function(req, res, next) {
  if (!req.user) {res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');}      
  next()
})
app.use((req, res, next) => {
  res.status(404).json({
    status: '404',
    descripcion: 'Pagina no encontrada'
  })
})

module.exports = app;